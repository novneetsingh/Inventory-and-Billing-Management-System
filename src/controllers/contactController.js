import Contact from "../models/Contact.js";

// Get all contacts
export const getAllContacts = async (req, res) => {
  try {
    const { name, email, phone, address, type } = req.query;
    const query = { businessId: req.user.id };

    if (name) query.name = { $regex: name, $options: "i" };
    if (email) query.email = { $regex: email, $options: "i" };
    if (phone) query.phone = { $regex: phone, $options: "i" };
    if (address) query.address = { $regex: address, $options: "i" };
    if (type) query.type = type;

    const contacts = await Contact.find(query).lean();

    return res.status(200).json({
      success: contacts ? true : false,
      message: contacts ? "Contacts fetched successfully" : "No contacts found",
      count: contacts ? contacts.length : 0,
      data: contacts ? contacts : null,
    });
  } catch (error) {
    console.log("Error in get all contacts controller", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add new contact
export const createContact = async (req, res) => {
  try {
    const { name, phone, email, address, type } = req.body;

    if (!name || !phone || !email || !address || !type) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const contact = await Contact.create({
      name,
      phone,
      email,
      address,
      type,
      businessId: req.user.id,
    });

    return res.status(201).json({
      success: contact ? true : false,
      message: contact ? "Contact created successfully" : "Contact not created",
      data: contact ? contact : null,
    });
  } catch (error) {
    console.log("Error in create contact controller", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update contact
export const updateContact = async (req, res) => {
  try {
    const { name, phone, email, address, type } = req.body;
    const contactId = req.params.id;

    const contact = await Contact.findOne({
      _id: contactId,
      businessId: req.user.id,
    });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    contact.name = name || contact.name;
    contact.phone = phone || contact.phone;
    contact.email = email || contact.email;
    contact.address = address || contact.address;
    contact.type = type || contact.type;

    await contact.save();

    return res.status(200).json({
      success: contact ? true : false,
      message: contact ? "Contact updated successfully" : "Contact not updated",
      data: contact ? contact : null,
    });
  } catch (error) {
    console.log("Error in update contact controller", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete contact
export const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;

    const contact = await Contact.findOneAndDelete({
      _id: contactId,
      businessId: req.user.id,
    });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    return res.status(200).json({
      success: contact ? true : false,
      message: contact ? "Contact deleted successfully" : "Contact not deleted",
      data: contact ? contact : null,
    });
  } catch (error) {
    console.log("Error in delete contact controller", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
