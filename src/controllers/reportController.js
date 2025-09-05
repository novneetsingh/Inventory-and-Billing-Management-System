import Product from "../models/Product.js";
import Transaction from "../models/Transaction.js";

// Get inventory report
export const getInventoryReport = async (req, res) => {
  try {
    const inventory = await Product.find({ businessId: req.user.id }).select(
      "name stock category price"
    );

    return res.status(200).json({
      success: inventory ? true : false,
      message: inventory
        ? "Inventory fetched successfully"
        : "No inventory found",
      count: inventory ? inventory.length : 0,
      data: inventory ? inventory : null,
    });
  } catch (error) {
    console.log("Error in get inventory report controller", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get detailed transactions report
export const getTransactionsReport = async (req, res) => {
  try {
    const { startDate, endDate, type } = req.query;

    const query = { businessId: req.user.id };

    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    } else if (startDate) {
      query.date = { $gte: new Date(startDate) };
    } else if (endDate) {
      query.date = { $lte: new Date(endDate) };
    }

    if (type) query.type = type;

    const transactions = await Transaction.find(query)
      .populate("customerId", "name email phone")
      .populate("vendorId", "name email phone")
      .populate("products.productId", "name price category")
      .lean();

    return res.status(200).json({
      success: transactions ? true : false,
      message: transactions
        ? "Transactions fetched successfully"
        : "No transactions found",
      count: transactions ? transactions.length : 0,
      data: transactions ? transactions : null,
    });
  } catch (error) {
    console.log("Error in getTransactionsReport:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
