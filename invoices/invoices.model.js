import mongoose from 'mongoose';

const FacturaSchema = new mongoose.Schema({
    usuarioId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario', 
        required: true 
    },
    productos: [{
        productoId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Producto', 
            required: true 
        },
        cantidad: { 
            type: Number, 
            required: true,
            min: 1
        }
    }],
    total: { 
        type: Number, 
        required: true,
        min: 0
    },
    metodoPago: {
        nombreTarjeta: { 
            type: String, 
            required: true 
        },
        numeroTarjeta: { 
            type: String, 
            required: true
        },
        fechaExpiracion: { 
            type: String, 
            required: true
        },
        cvv: { 
            type: String, 
            required: true
        }
    },
    fecha: { 
        type: Date, 
        default: Date.now 
    }
});

FacturaSchema.methods.calcularTotal = function() {
    this.total = this.productos.reduce((acc, producto) => {
        const precioProducto = 100; 
        return acc + (producto.cantidad * precioProducto);
    }, 0);
};

const Factura = mongoose.model('Factura', FacturaSchema);

export default Factura;