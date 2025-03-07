import { Schema, model } from "mongoose";

const carritoSchema = new Schema({
    usuarioId: {
        type: Schema.Types.ObjectId,
        ref: "Cliente",
        required: true
    },
    productos: [ 
        {
            productoId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            cantidad: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ]
}, {
    versionKey: false,
    timestamps: true
});

export default model("Carrito", carritoSchema);