import App from '../../App';
import './Contact.css';
import { useState } from 'react';


// El formulario aún no tiene validación alguna de datos, pero visualmente simula que ciertos campos son obligatorios. 
function Contact() {

  const [thanks, setThanks] = useState(false) // Planteo variable de estado de tipo booleana para mostrar mensaje al recibir form.

  const handleSubmit = (event: any) => {
    event.preventDefault();           // Previniendo la recarga automática de la página al hacer submit.
    setThanks(true);                 // Cambia thanks de false a true, para permitir mensaje (VER FINAL DEL FORM)
    setTimeout(() => {
      setThanks(false);
    }, 2000);                        // El mensaje dura 2 segundos y desaparece. 
  }

  
  return (
    <App>
        <form className="formLayout" onSubmit={handleSubmit}>
            <h4 className="formTitle">¡CONTACTANOS!</h4>

            <span className='alert'>Los campos con señalados con * son obligatorios</span>

            <label htmlFor="firstName">Nombre* </label>
            <input type="text" name="firstName"/>

            <label htmlFor="lastName">Apellido</label>
            <input type="text" name="lastName"  />

            <label htmlFor="email">Correo electrónico *</label>
            <input type="email" name="email" />

            <label htmlFor="contact" className='contact'>¿Cómo preferís ser contactado/a? *</label>  
            <select className="form-select" name="contact">
                      <option selected>Selecciona una opción</option>
                      <option value="1">Por mail.</option>
                      <option value="2">No quiero que me contacten, sólo quería hacer un comentario. </option>
            </select>   

            <label htmlFor="message">Tu mensaje/comentario * </label>
            <textarea name="message" id="message" rows={6} placeholder="Escriba su mensaje..."/> 

            <div className="formButtonContainer">
              <button type="submit" className="btn btn-primary">Enviar</button>
              <button type="reset" className="btn btn-dark">Borrar</button>
            </div>
            {/* Como thanks es true, se muestra el mensaje de agradecimiento */}
            {thanks && <h4 className='thanksMsg'>¡Gracias por contactarnos!</h4>} 
        </form>
    </App>
  )
}

export default Contact
