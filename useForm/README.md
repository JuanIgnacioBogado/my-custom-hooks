# useForm Hook

Ejemplo de uso:

```javascript
const initialForm = {
  name: 'Nacho',
  age: 24,
  email: 'correo@correo.com'
};

const { formState, handleInputChange, resetForm } = useForm(initialForm);
// También se pueden desestructurar las keys de tu initialForm: const { name, age, email } = useForm(...);
```
