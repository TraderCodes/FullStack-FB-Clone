module.exports = async function (req, res, next) {
  try {
    // object.value turn object to array add flat to grab object
    // 🔴check if user send files or not
    if (!req.files || Object.values(req.files).flat().length === 0) {
      return res.status(400).json({ error: 'No files selected' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
