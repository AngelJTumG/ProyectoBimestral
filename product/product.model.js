import { Schema, model } from "mongoose";

const productSchema = new Schema({
    nombrePro: {
        type: String,
        required: [true, "nombre del producto es requirido"],
        maxLength: [60]
    },
    descripcion: {
        type: String,
        required: [true, "Description product is required"],
        maxLength: [200]
    },
    precio: {
        type: Number,
        required: [true, "Precio requerido"],
    },
    stock: {
        type: Number
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model('Product', productSchema);