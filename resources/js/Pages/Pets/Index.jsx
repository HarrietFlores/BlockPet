import React, { useState } from 'react';
import { Link } from '@inertiajs/inertia-react';
import Dialog from '../../Components/Dashboard/Dialog';
import Base from '../../Layouts/Base';
import useDialog from '../../Hooks/useDialog';
import CreatePet from '../../Components/Dashboard/Pets/CreatePet';
import EditPet from '../../Components/Dashboard/Pets/EditPet';
import { Inertia } from '@inertiajs/inertia';

export default function Index(props) {
  const { data: pets, links, meta } = props.pets;
  const [state, setState] = useState([]);
  const [addDialogHandler, addCloseTrigger, addTrigger] = useDialog();
  const [updateDialogHandler, updateCloseTrigger, updateTrigger] = useDialog();
  const [destroyDialogHandler, destroyCloseTrigger, destroyTrigger] = useDialog();
  const [qrDialogHandler, qrCloseTrigger, qrTrigger] = useDialog();

  const openUpdateDialog = (pet) => {
    setState(pet);
    updateDialogHandler();
  };

  const openDestroyDialog = (pet) => {
    setState(pet);
    destroyDialogHandler();
  };
  const openqrDialog = (pet) => {
    setState(pet);
    qrDialogHandler();
  };

  const destroyPet = () => {
    Inertia.delete(route('pets.destroy', state.id), {
      onSuccess: () => destroyCloseTrigger(),
    });
  };

  return (

    <div className="container-fluid py-4">
      <Dialog trigger={addTrigger} title="Agregar una mascota">
        <CreatePet close={addCloseTrigger} />
      </Dialog>

      <Dialog trigger={updateTrigger} title={`Update Pet: ${state.nombre}`}>
        <EditPet model={state} close={updateCloseTrigger} />
      </Dialog>

      <Dialog trigger={destroyTrigger} title={`Delete Pet: ${state.nombre}`}>
        <p>Estás seguro de eliminar esta mascota?</p>
        <div className="modal-footer">
          <button
            type="button"
            className="btn bg-gradient-secondary"
            data-bs-dismiss="modal"
          >
            Cerrar
          </button>
          <button
            type="submit"
            onClick={destroyPet}
            className="btn bg-gradient-danger"
          >
            Eliminar
          </button>
        </div>
      </Dialog>
      <Dialog trigger={qrTrigger} title={`Código QR de ${state.nombre}`}>
        <div className="d-flex justify-content-center align-items-center mb-3">
            <img
            src={state.qr}
            alt={`QR de ${state.nombre}`}
            className="img-fluid rounded"
            style={{ maxWidth: '300px', maxHeight: '300px' }}
            />
        </div>
        <div className="modal-footer d-flex justify-content-center">
            <button
            type="button"
            className="btn bg-gradient-secondary"
            data-bs-dismiss="modal"
            >
            Cerrar
            </button>
        </div>
      </Dialog>


      <div className="row pb-4">
        <div className="col-12 w-100">
          <div className="card h-100 w-100">
            <div className="card-header pb-0">
              <div className="row">
                <div className="col-md-6">
                  <h6>Tabla de Mascotas</h6>
                </div>
                <div className="col-md-6 d-flex justify-content-end">
                  <button
                    onClick={addDialogHandler}
                    type="button"
                    className="btn bg-gradient-success btn-block mb-3"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModalMessage"
                  >
                    Agregar una mascota +
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body px-0 pt-0 pb-2">
            {pets.length === 0 ? (
                <p className="text-center">Sin mascotas registradas</p>
                    ) : (
              <div className="table-responsive-xxl p-0" width="100%">
                <table className="table align-items-center justify-content-center mb-0" width="100%">
                  <thead>
                    <tr>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-centter">#</th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-left">
                          Imagen
                      </th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-left">
                        Nombre
                      </th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-left">
                        Color
                      </th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pets.map((pet, index) => (
                      <tr key={pet.id}>
                        <td className="text-center">{meta.from + index}</td>
                        <td className="text-left">
                            <img
                                src={pet.imagen}
                                alt={`Imagen de ${pet.nombre}`}
                                className="img-fluid rounded"
                                style={{ maxWidth: '100px', maxHeight: '100px' }}
                            />
                        </td>
                        <td className="text-left">
                          <h6 className="mb-0 text-sm">{pet.nombre}</h6>
                        </td>
                        <td className="text-left">
                          <span className="text-xs font-weight-bold">{pet.color}</span>
                        </td>
                        <td className="align-middle text-left">
                          <div className="d-flex align-items-center text-left">
                            <button
                              type="button"
                              onClick={() => openUpdateDialog(pet)}
                              className="btn btn-vimeo btn-icon-only"
                            >
                              <span className="btn-inner--icon">
                                <i className="fas fa-pencil-alt" />
                              </span>
                            </button>
                            <button
                              type="button"
                              onClick={() => openDestroyDialog(pet)}
                              className="btn btn-youtube btn-icon-only"
                            >
                              <span className="btn-inner--icon">
                                <i className="fas fa-trash" />
                              </span>
                            </button>
                            <button
                            type="button"
                            onClick={() => openqrDialog(pet)}
                            className="btn btn-primary btn-icon-only"
                            >
                            <span className="btn-inner--icon">
                                <i className="fas fa-qrcode" />
                            </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          {meta.links.map((link, k) => (
            <li key={k} className="page-item">
              <Link
                disabled={link.url == null ? true : false}
                as="button"
                className={`${
                  link.active && 'bg-info'
                } ${
                  link.url == null && 'btn bg-gradient-secondary text-white'
                } page-link`}
                href={link.url || ''}
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

Index.layout = (page) => <Base key={page} children={page} title={'Manage Pets'} />;
