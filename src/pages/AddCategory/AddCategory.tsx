import { useEffect, useState } from 'react'
import { CloseOutline } from 'react-ionicons'
import styles from './styles/AddCategory.module.css'

interface Field {
  id: number
}

interface FieldState extends Field {
  error: boolean
}

interface FormValues {
  name: string,
  desc: string,
  field1: string,
  field2: string,
  field3: string,
  field4: string,
  field5: string,
  field6: string,
}

function AddCategory() {
  const [fields, setFields] = useState<FieldState[]>([{id: 1, error: true}])
  const [isFormValid, setIsFormValid] = useState<boolean>(false)
  const [formData, setFormData] = useState<FormValues>({
    name: '',
    desc: '',
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    field5: '',
    field6: '',
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    console.log(event.target.name)
    // Создать условия для
    const title = name === 'name' || name === 'desc' ? name : 'field' + name
    setFormData((prevData) => ({ ...prevData, [title]: value}))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Выводим значения формы
    console.log(formData)
  }

  const handleAddField = (event:React.MouseEvent) => {
    event.preventDefault()
    setFields([...fields, {id: fields.length + 1, error: true}]);
  }

  const handleRemoveField = (id:number) => {
    const newFields = fields.filter(field => field.id != id)
    setFields(newFields)
  }

  const handleBlurField = (event: React.FocusEvent<HTMLInputElement>) => {
    const id = Number(event.target.name)
    const value = event.target.value
    const fieldIndex = fields.findIndex(field => field.id === id)

    if (value.trim() === '') {
      setFields([
        ...fields.slice(0, fieldIndex),
        { ...fields[fieldIndex], error: true },
        ...fields.slice(fieldIndex + 1)
      ]);
    } else {
      setFields([
        ...fields.slice(0, fieldIndex),
        { ...fields[fieldIndex], error: false },
        ...fields.slice(fieldIndex + 1)
      ]);
    }
  }

  const isButtonDisabled = fields.some(field => field.error !== false);

  return (
    <div className={styles.Container}>
      <div className={styles.Forms}>  
        <h1 className={styles.PageTitle}>Добавить страницу</h1>
        <form className={styles.PageForm} onSubmit={handleSubmit}>
          <label>
            <span className={styles.LabelTitle}>Название страницы:</span>
            <input 
              className={styles.Input} 
              type="text" 
              name='name'
              placeholder='Введите название...' 
              value={formData.name}
              onChange={handleInputChange}
              />
            <div style={{width: '160px'}}/>
            <div style={{width: '24px'}}/>
          </label>
          <label>
            <span className={styles.LabelTitle}>Описание страницы:</span>
            <textarea  
              placeholder='Введите описание...'
              name='desc'
              value={formData.desc}
              onChange={handleInputChange}
            />
            <div style={{width: '160px'}}/>
            <div style={{width: '24px'}}/>
          </label>

          <div className={styles.LabelColumns}>
            <h2 className={styles.LabelColumnsTitle}>Поля таблицы</h2>
            <button 
              className={styles.SmallButton}
              onClick={handleAddField}
              disabled={fields.length > 5 ? true : false}
              >
                Добавить поле
            </button>
          </div>
          
          <div className={styles.Fields}>
            {fields.map((field, key) => (
                <label key={field.id}>
                  <span className={styles.LabelTitle}>Имя колонки {field.id}:<i className={field.error ? styles.SpanError : ''}> *</i></span>
                  <input  
                    type="text" 
                    className={styles.Input} 
                    placeholder='Введите имя колонки...' 
                    name={field.id.toString()}
                    onBlur={handleBlurField}
                    value={formData[`field${(field.id).toString}` as keyof FormValues]}
                    onChange={handleInputChange}
                  />
                  {/* <select
                    name={field.id.toString()}
                    //onBlur={handleBlurField} 
                    id="">
                    <option value="text">Текст</option>
                    <option value="image">Изображение</option>
                    <option value="select">Выбор</option>
                    <option value="category">Категория</option>
                  </select> */}
                  {
                    field.id != 1 ?
                      <div className={styles.CloseIcon} onClick={() => handleRemoveField(field.id)}>
                        <CloseOutline width="24px" height="24px" />
                      </div> : <div style={{width: '24px'}} />
                  }
                  
              </label>
            ))}
          </div>

          <button
            className={styles.BigButton}
            disabled={isButtonDisabled}
            type="submit"
          >Создать страницу</button>
        </form>
      </div>
    </div>
  )
}

export default AddCategory