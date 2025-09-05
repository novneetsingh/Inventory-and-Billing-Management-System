import Transaction from "../models/Transaction.js";
import Product from "../models/Product.js";

// List all transactions
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      businessId: req.user.id,
    }).lean();

    return res.status(200).json({
      success: transactions ? true : false,
      message: transactions
        ? "Transactions fetched successfully"
        : "No transactions found",
      count: transactions ? transactions.length : 0,
      data: transactions ? transactions : null,
    });
  } catch (error) {
    console.log("Error in get all transactions controller", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Record new transaction (sale or purchase)
export const createTransaction = async (req, res) => {
  try {
    const { type, customerId, vendorId, products } = req.body;
    const businessId = req.user.id;

    // Calculate total amount from products array
    const totalAmount = products.reduce((sum, item) => {
      return sum + item.quantity * item.price;
    }, 0);

    const transaction = new Transaction({
      type,
      customerId,
      vendorId,
      products,
      totalAmount,
      businessId,
    });

    // Validate stock levels for sale transactions
    if (transaction.type === "sale") {
      for (const item of transaction.products) {
        const product = await Product.findById(item.productId).lean();

        if (!product) {
          return res.status(404).json({
            success: false,
            error: `Product ${item.productId} not found`,
          });
        }

        if (product.stock < item.quantity) {
          return res.status(400).json({
            success: false,
            error: `Insufficient stock for product ${product.name}`,
          });
        }
      }
    }

    await transaction.save();

    // Update product stock levels
    for (const item of transaction.products) {
      const product = await Product.findById(item.productId);

      const stockChange =
        transaction.type === "purchase" ? item.quantity : -item.quantity;
      product.stock += stockChange;

      await product.save();
    }

    return res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      data: transaction,
    });
  } catch (error) {
    console.log("Error in create transaction controller", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
