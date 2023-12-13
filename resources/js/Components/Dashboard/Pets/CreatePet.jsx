import { useForm } from '@inertiajs/inertia-react';
import React from 'react';

export default function CreatePet({ close }) {
    const { data, setData, post, reset, errors } = useForm({
        nombre: '',
        color: '',
        imagen: null,
        raza: '',
        comportamiento: '',
    });

    const onChange = (e) => {
        const { id, value, type, files } = e.target;
        const inputValue = type === 'file' ? files[0] : value;

        setData({ ...data, [id]: inputValue });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nombre', data.nombre);
        formData.append('color', data.color);
        formData.append('imagen', data.imagen);
        formData.append('raza', data.raza);
        formData.append('comportamiento', data.comportamiento);

        post(route('pets.store'), {
            data: formData,
            onSuccess: () => {
                reset();
                close();
            },
        });
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="modal-body">
                <div className="form-group">
                    <label htmlFor="nombre" className="col-form-label">Nombre:</label>
                    <input type="text" className="form-control" name='nombre' value={data.nombre} onChange={onChange} id="nombre" />
                    {errors && <div className='text-danger mt-1'>{errors.name}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="color" className="col-form-label">Color:</label>
                    <input type="text" className="form-control" name='color' value={data.color} onChange={onChange} id="color" />
                    {errors && <div className='text-danger mt-1'>{errors.color}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="imagen" className="col-form-label">Imagen:</label>
                    <input type="file" className="form-control" name="imagen" onChange={onChange} id="imagen" accept="image/*" />
                    {errors && <div className='text-danger mt-1'>{errors.imagen}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="raza" className="col-form-label">Raza:</label>
                    <input type="text" className="form-control" name='raza' value={data.raza} onChange={onChange} id="raza" />
                    {errors && <div className='text-danger mt-1'>{errors.raza}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="comportamiento" className="col-form-label">Descripción:</label>
                    <textarea type="text" className="form-control" name='comportamiento' value={data.comportamiento} onChange={onChange} id="comportamiento" />
                    {errors && <div className='text-danger mt-1'>{errors.comportamiento}</div>}
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="submit" className="btn bg-gradient-primary">Guardar</button>
            </div>
        </form>
    )
}
