import React, {useState} from 'react';
import {auth} from "../../firebase";
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import {storage, db} from "../../firebase";
import {setDoc, doc} from 'firebase/firestore'
import {useNavigate, Link} from 'react-router-dom';
import FormInput from "../../components/FormInput";
import LoadingSpinner from "../../components/LoadingSpinner";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    file: null,
  })
  const navigate = useNavigate();
  const inputs = [
    {
      id: 'inp-username',
      name: 'username',
      type: 'text',
      placeholder: 'Username',
      errorMessage: 'Username should be 3-16 characters',
      required: true,
      pattern: '^[A-Za-z0-9]{3,16}$'
    },
    {
      id: 'inp-email',
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      errorMessage: 'Should be a valid email address',
      required: true,
      pattern: "^(([^<>()[\\]\\\\.,;:\\s@\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$"
    },
    {
      id: 'inp-password',
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      errorMessage: 'Password should be 8-20 characters and include at least 1 letter 1 number',
      required: true,
      pattern: "((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,20})"
    }
    ,
    {
      id: 'inp-confirmPassword',
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm Password',
      errorMessage: 'Passwords don\'t match',
      required: true,
      pattern: values.password
    },
    {
      id: 'inp-phoneNumber',
      name: 'phoneNumber',
      type: 'text',
      placeholder: 'Phone number',
      required: true,
      errorMessage: 'Please enter valid phone number',
      pattern: '^[0-9\\-\\+]{9,15}$'
    },
    {
      id: 'inp-file',
      name: 'file',
      type: 'file',
      placeholder: '',
      label: 'add an avatar',
      required: true,
      errorMessage: 'Please add Photo',
    }
  ];
  const handleChange = (e, file) => {
    setValues({
      ...values,
      [e.target.name]: file || e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    const displayName = values.username.toLowerCase()
    const email = values.email.toLowerCase()
    const password = values.password
    const file = values.file
    const phoneNumber = values.phoneNumber
    try{
      const userResponse = await createUserWithEmailAndPassword(auth, email, password)
      const storageRef = ref(storage, userResponse.user.uid);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed',
        (snapshot) => {
          console.log('Uploading file...');
        },
        (error) => {
          console.log(error)
          setLoading(false)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then(async (downloadURL) => {
            await updateProfile(userResponse.user, {
              displayName: displayName,
              photoURL: downloadURL,
            })
            await setDoc(doc(db, 'users', userResponse.user.uid), {
              uid: userResponse.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
              phoneNumber: phoneNumber,
            })
            await setDoc(doc(db, 'userChats', userResponse.user.uid), {})
              setLoading(false)
            navigate('/');
          });
        }
      );
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }
  return (
    <div className={'formContainer'}>
      <div className={'formWrapper'}>
        <span className={'logo'}>Є Сhat</span>
        <span className={'title'}>Register</span>
        <form onSubmit={handleSubmit}>
          {inputs.map(input => (
            <FormInput key={input.id} {...input} value={values[input.name]} handleChange={handleChange}/>
          ))}
          <button>Sign up</button>
        </form>
        <p>You do have an account ? <Link to={'/login'}>Login</Link></p>
        {loading && <LoadingSpinner/>}
      </div>
    </div>
  );
};

export default Register;