import { Schema, model } from "mongoose";

const categoriaSchema = Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
  },
  estado: {
    type: Boolean,
    default: true
  }
},
{
  versionKey: false,
  timestamps: true,
});

categoriaSchema.methods.toJSON = function() {
  const { _id, ...categoria } = this.toObject();
  categoria.uid = _id;
  return categoria;
}

export default model("Categoria", categoriaSchema);