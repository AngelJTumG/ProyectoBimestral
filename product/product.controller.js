import Product from "./product.model.js";
import Category from "../categoria/categoria.model.js";

export const addProduct = async (req, res) => {
    try {
        const data = req.body;
        const category = await Category.findById(data.category);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found',
            });
        }

        const product = new Product({
            ...data,
            category: category._id,
        });

        await product.save();

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error saving product',
            error: error.message
        });
    }
};

export const getProductByName = async (req, res) => {
    try {
        const { name } = req.params;
        const product = await Product.findOne({ name });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching product',
            error: error.message
        });
    }
};

export const getProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: error.message
        });
    }
};

export const getProductByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        console.log(`Fetching products for category: ${categoryId}`);
        
        const categoryExists = await Category.findById(categoryId);
        if (!categoryExists) {
            return res.status(404).json({
                success: false,
                message: 'Category not found',
            });
        }

        const products = await Product.find({ category: categoryId });
        console.log(`Products found: ${products.length}`);
        res.status(200).json({
            success: true,
            products
        });
    } catch (error) {
        console.error(`Error fetching products by category: ${error.message}`);
        res.status(500).json({
            success: false,
            message: 'Error fetching products by category',
            error: error.message
        });
    }
};

export const getProductSoldOut = async (req, res) => {
    try {
        console.log('Fetching sold out products');
        
        const products = await Product.find({ stock: 0 });
        
        console.log(`Sold out products found: ${products.length}`);
        
        res.status(200).json({
            success: true,
            products
        });
    } catch (error) {
        console.error(`Error fetching sold out products: ${error.message}`);
        res.status(500).json({
            success: false,
            message: 'Error fetching sold out products',
            error: error.message
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { uid } = req.params;
        const { ...data } = req.body;

        const product = await Product.findByIdAndUpdate(uid, data, { new: true });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'actualizado con exito',
            product
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error updating product',
            error: error.message
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        await Product.findByIdAndDelete(productId);
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting product',
            error: error.message
        });
    }
};

export const getTopSellingProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ sales: -1 }).limit(10);
        res.status(200).json({
            success: true,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching top selling products',
            error: error.message
        });
    }
};

