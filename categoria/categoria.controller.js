import Product from "../product/product.model.js";
import Categoria from "./categoria.model.js";

export const addCategory = async (req, res) => {
    try {
        const data = req.body;

        const category = new Categoria({
            ...data,
        });

        await category.save();

        res.status(200).json({
            success: true,
            category
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error adding category',
            error
        });
    }
}

export const getCategory = async (req, res) => {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const query = {};

        const [total, categories] = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        return res.status(200).json({
            success: true,
            total,
            categories
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error getting list of categories",
            error: error.message
        });
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { descripcion } = req.body;

        const categoryExists = await Categoria.findById(id);
        if (!categoryExists) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }
        const categoryUpdate = await Categoria.findByIdAndUpdate(id, { descripcion }, { new: true });

        res.status(200).json({
            success: true,
            message: 'Updated Category',
            category: categoryUpdate,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating category',
            error: error.message
        });
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const categoryExists = await Categoria.findById(id);
        if (!categoryExists) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        await Categoria.findByIdAndDelete(id);

        const categoryDefault = await Categoria.findOne({ nombre: "General" });
        await Product.updateMany({ categoria: id }, { categoria: categoryDefault._id });

        return res.status(200).json({
            success: true,
            message: "Deleted Category",
            category: categoryExists
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error deleting category',
            error: error.message
        });
    }
}