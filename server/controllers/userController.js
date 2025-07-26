import sql from "../configs/db.js";

// Get creations for a user
export const getUserCreations = async (req, res) => {
  try {
    const { userId } = req.auth();

    const creations = await sql`
      SELECT * FROM creations 
      WHERE user_id = ${userId} 
      ORDER BY created_at DESC
    `;

    res.json({ success: true, creations }); // ✅ fixed response key
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Toggle like/unlike
export const toggleLikeCreation = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;

    const [creation] = await sql`
      SELECT * FROM creations 
      WHERE id = ${id}
    `;

    if (!creation) {
      return res.json({ success: false, message: "Creation not found" });
    }

    const currentLikes = creation.likes || [];
    const userIdStr = userId.toString();
    let updatedLikes;
    let message;

    if (currentLikes.includes(userIdStr)) {
      updatedLikes = currentLikes.filter((uid) => uid !== userIdStr);
      message = "Creation unliked";
    } else {
      updatedLikes = [...currentLikes, userIdStr];
      message = "Creation liked";
    }

    await sql`
      UPDATE creations 
      SET likes = ${updatedLikes}::text[] 
      WHERE id = ${id}
    `;

    res.json({ success: true, message });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get published creations
export const getPublishedCreations = async (req, res) => {
  try {
    const creations = await sql`
      SELECT * FROM creations 
      WHERE publish = true 
      ORDER BY created_at DESC
    `;

    res.json({ success: true, creations }); // ✅ fixed response key
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
