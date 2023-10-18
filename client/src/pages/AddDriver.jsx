import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllTeams } from '../redux/Actions/DriversActions';
import { mainService } from "../features/mainService";

const initialForm = {
  nombre:"",
  imagen:"",
  apellido:"",
  nacionalidad:"",
  descripcion:"",
  fechaDeNacimiento: "",
  teams: [],
};

const AddDriver = () => {
  const state = useSelector(state => state);
  const { teams } = state;
  const dispatch = useDispatch();
  const navigate  = useNavigate();

  const [form, setForm] = useState(initialForm);

  const [inputValue, setInputValue] = useState('');
  const [selectedEscuderias, setSelectedEscuderias] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [inputFocus, setInputFocus] = useState(null);

  // VALIDATION OBJECT
  const [validation, setValidation] = useState({
    nombre:null,
    imagen:null,
    apellido:null,
    nacionalidad:null,
    descripcion:null,
    fechaDeNacimiento: null,
    teams: null,
  });


  const [escuderiasSelect, setEscuderiasSelect] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Filtra las sugerencias basadas en el valor del input
    const filtered = escuderiasSelect?.filter((suggestion) =>
      suggestion.nombre.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredSuggestions(filtered);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue("");
    setSelectedEscuderias([...selectedEscuderias, suggestion]);
    setFilteredSuggestions([]);
    const newEscuderiasSelect = escuderiasSelect.filter(escuderia => escuderia.id != suggestion.id);
    setEscuderiasSelect(newEscuderiasSelect);
    setValidation({
      ...validation,
      teams: newEscuderiasSelect,
    })
  };

  const handleDeleteEscuderia = (escuderiaParam) => {
    const newSelectedEscuderias = selectedEscuderias.filter(escuderia => escuderia.id != escuderiaParam.id);
    setSelectedEscuderias(newSelectedEscuderias);
    setEscuderiasSelect([...escuderiasSelect, escuderiaParam]);
    setValidation({
      ...validation,
      teams: newSelectedEscuderias,
    })
  };
  const handleChange = (e) => {
    let value = e.target.value;

    if(e.target.name === "nacionalidad" && value) {
      value = value[0].toUpperCase() + value.slice(1);
    }

    setForm({
      ...form,
      [e.target.name]: value
    })

    setValidation({
      ...validation,
      [e.target.name]: value,
    })
  };

  const handleOnFocus = (e) => {
    setInputFocus(true)
  }

  const handleOnBlur = (e) => {
    setTimeout(() => {
      setInputFocus(false)  
    }, 200);
  }

  const imageIsUrl = () => {
    if(validation.imagen && validation.imagen.length > 0) {
      const expresionRegularURL = /^(ftp|http|https):\/\/[^ "]+$/;

      return !expresionRegularURL.test(validation.imagen);
    }
  }

  const onlyHasLetters = (key) => {
    if(validation[key] && validation[key].length > 0) {
      const expresionRegularURL = /^[a-zA-Z]+$/;

      return !expresionRegularURL.test(validation[key]);
    }
  }

  const dobIsFormatted = () => {
    if(validation.fechaDeNacimiento && validation.fechaDeNacimiento.length > 0) {
      const expresionRegular = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

      if (!expresionRegular.test(validation.fechaDeNacimiento)) {
        return true;
      }
    }
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();

    let ableToSend = true;
    const newValidation = {};

    Object.keys(validation).forEach(key => {
      if(key === "teams") {
        if(validation[key] === null){
          ableToSend = false;
          newValidation.teams = []
        }
      }
      else if(!validation[key]){
        ableToSend = false;
        newValidation[key] = ""
      }
    });

    setValidation({
      ...validation,
      ...newValidation,
    })

    if(imageIsUrl() || dobIsFormatted() || onlyHasLetters("nombre") || onlyHasLetters("apellido") || onlyHasLetters("nacionalidad")) {
      ableToSend = false;
    }

    if(ableToSend) {
      let finalObj = {...form, fecha_de_nacimiento: form.fechaDeNacimiento, teams: selectedEscuderias.map(e => e.id)};
      await mainService.createDriver(finalObj)
      navigate("/home");
    } else {
      alert("There was an error trying to create driver")
    }

  };


  // CARGA ESCUDERIAS
  useEffect(() => {
    dispatch(getAllTeams());
  }, []);

  useEffect(() => {
    setEscuderiasSelect(teams)
  }, [teams]);

  return ( 
    <div className="add-driver-main-wrapper position-relative">
      <NavBar/>
      <div className='add-driver-wrapper'>
        <div className='add-form-div'>
          <form className='add-form' onSubmit={handleSubmit}>

            <div className='w-50 column'>
              <input type="text" name='nombre' placeholder='What is the name of the driver?' onChange={handleChange} value={form.nombre} />
              {/* NOMBRE VALIDATION */}
              {validation.nombre !== null && validation.nombre.length === 0 && <span className='validation-span'>Please tell us what is the name of the driver</span>}
              {onlyHasLetters("nombre") && <span className='validation-span'>Please only use letters for the name</span>}
            </div>
            <div className='w-50 column'>
              <input type="text" name='apellido' placeholder='What is the surname of the driver?' onChange={handleChange} value={form.apellido} />
              {/* APELLIDO VALIDATION */}
              {validation.apellido !== null && validation.apellido.length === 0 && <span className='validation-span'>Please write the lastname of the driver </span>}
              {onlyHasLetters("apellido") && <span className='validation-span'>Please only use letters for the last name</span>}
            </div>
            <div className='w-50 column'>
              <input type="text" name='nacionalidad' placeholder='What is the nationality of the driver?' onChange={handleChange} value={form.nacionalidad} />
              {/* NACIONALIDAD VALIDATION */}
              {validation.nacionalidad !== null && validation.nacionalidad.length === 0 && <span className='validation-span'>Please write the nationality of the driver </span>}
              {onlyHasLetters("nacionalidad") && <span className='validation-span'>Please only use letters for the nationaliy</span>}
            </div>

            <div className='w-50 column'>
              <input type="text" name='imagen' placeholder='Upload an image URL of the plate' onChange={handleChange} value={form.imagen} />
              
              {/* IMAGE VALIDATION */}
              {validation.imagen !== null && validation.imagen.length === 0 && <span className='validation-span'>Please share an image of the driver </span>}
              {imageIsUrl() && <span className='validation-span'>Please image should be url formatted </span>}
            </div>
            <div className='w-50 column'>
              <input type="text" name='fechaDeNacimiento' placeholder='What is the DOB of the driver?' onChange={handleChange} value={form.fechaDeNacimiento} />
              {/* FECHA DE NACIMIENTO VALIDATION */}
              {validation.fechaDeNacimiento !== null && validation.fechaDeNacimiento.length === 0 && <span className='validation-span'>Please write the DOB of the driver </span>}
              {dobIsFormatted() && <span className='validation-span'>Please dob format must be dd/mm/yyyy</span>}
            </div>

            <div className='w-50 column'>
              <input type="text" name='descripcion' placeholder='Please add a description of the driver' onChange={handleChange} value={form.descripcion} />
              
              {/* DESCRIPCION VALIDATION */}
              {validation.descripcion !== null && validation.descripcion.length === 0 && <span className='validation-span'>Please share a description of the driver</span>}
            </div>
            <div className="w-50 column autocomplete-input">
              <input
                type="text"
                placeholder="Buscar escuderia"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleOnBlur}
                onFocus={handleOnFocus}
              />
              {inputValue.length === 0 && inputFocus && (
                <ul className="suggestions">
                  {escuderiasSelect.map((suggestion, index) => (
                    <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                      {suggestion.nombre}
                    </li>
                  ))}
                </ul>
              )}

              {inputValue.length > 0 && (
                <ul className="suggestions">
                  {filteredSuggestions.map((suggestion, index) => (
                    <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                      {suggestion.nombre}
                    </li>
                  ))}
                  {
                    filteredSuggestions.length === 0 && (
                      <li style={{cursor: 'auto'}}>Any team was found with that string</li>
                    )
                  }
                </ul>
              )}
            </div>
            <div className="w-50 escuderia-selected-container">
              {selectedEscuderias.length > 0 && (
                <ul>
                  {selectedEscuderias.map((suggestion, index) => (
                    <div className='escuderia-selected-container'>
                      <li key={index} >
                        {suggestion.nombre}
                      </li>
                      <div class="close-button" onClick={() => handleDeleteEscuderia(suggestion)}>
                        <span class="close-icon">X</span>
                      </div>
                    </div>
                  ))}
                </ul>
              )}
            </div>
            {validation.teams !== null && validation.teams.length === 0 && <span className='validation-span'>Please select at least one team for the driver</span>}
            <div style={{paddingTop:"6rem"}} className='d-flex justify-content-end align-items-end w-80'>
            <button type='submit' className="button-82-pushable">
              <span className="button-82-shadow"></span>
              <span className="button-82-edge"></span>
              <span className="button-82-front text">
                Add Driver!
              </span>
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
   );
}
 
export default AddDriver;