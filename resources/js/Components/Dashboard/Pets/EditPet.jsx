import { useForm } from '@inertiajs/inertia-react';
import React, { useEffect } from 'react';

export default function EditPet({ close, model }) {
    const { data, setData, put, reset, errors } = useForm({
        nombre: model.nombre,
        color: model.color,
        imagen: null,
        raza: model.raza,
        comportamiento: model.comportamiento,
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

        put(route('pets.update', model.id), {
            data: formData,
            onSuccess: () => {
                reset();
                close();
            },
        });
    };

    useEffect(() => {
        setData({
            ...data,
            nombre: model.nombre,
            color: model.color,
            imagen: model.imagen,
            raza: model.raza,
            comportamiento: model.comportamiento,
        });
    }, [model]);

    return (
        <form onSubmit={onSubmit} encType="multipart/form-data">
            <div className="modal-body">
                <div className="form-group">
                    <label htmlFor="nombre" className="col-form-label">Nombre:</label>
                    <input type="text" className="form-control" name="name" value={data.nombre} onChange={onChange} id="nombre" />
                    {errors && <div className='text-danger mt-1'>{errors.name}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="color" className="col-form-label">Color:</label>
                    <input type="text" className="form-control" name="color" value={data.color} onChange={onChange} id="color" />
                    {errors && <div className='text-danger mt-1'>{errors.color}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="imagen" className="col-form-label">Imagen:</label>
                    <input type="file" className="form-control" name="imagen" onChange={onChange} id="imagen" accept="image/*" />
                    {errors && <div className='text-danger mt-1'>{errors.imagen}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="raza" className="col-form-label">Raza:</label>
                    <input type="text" className="form-control" name="raza" value={data.raza} onChange={onChange} id="raza" />
                    {errors && <div className='text-danger mt-1'>{errors.raza}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="comportamiento" className="col-form-label">Descripción:</label>
                    <textarea type="text" className="form-control" name="comportamiento" value={data.comportamiento} onChange={onChange} id="comportamiento" />
                    {errors && <div className='text-danger mt-1'>{errors.comportamiento}</div>}
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="submit" className="btn bg-gradient-primary">Actualizar</button>
            </div>
        </form>
    )
}
