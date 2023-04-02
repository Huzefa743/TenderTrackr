import React, { useState } from 'react';

function Rough(){
    const [formFields, setFormFields] = useState([
        {name:'', age:''},
    ])
    const handleFormChange= (event, index)=>{
        console.log(index, event.target.name)
        let data = [...formFields]
        data[index][event.target.name] = event.target.value;
        setFormFields(data);
    }
    const submit =(e)=>{
        e.preventDefault();
        console.log(formFields)
    }
    const addFields =() =>{
       let object ={
        name:'',
        age:''
       }
       setFormFields([...formFields, object])
    }
    const removeFields =(index)=>{
        console.log(" index", index)
       let data = [...formFields]
       data.splice(index, 1)
       setFormFields(data)
    }
    return (
        <div className='App'>
            <form onSubmit={submit}>
                {formFields.map((form, index)=>{
                    
                    return(
                        <div key={index}>
                            <input name="name" onChange={event => handleFormChange(event, index)} value={form.name} placeholder="Name"></input>
                            <input name="age" onChange={event => handleFormChange(event, index)} value={form.age} placeholder="Age"></input>
                            <button hidden={index===0} onClick={()=>removeFields(index)}>Remove</button>
                        </div>
                    )
                })}
            </form>

            <button onClick={addFields}>Add More...</button>
            <button onClick={submit}>Submit</button>
        </div>
    )
}

export default Rough




