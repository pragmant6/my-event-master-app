import React from 'react';
import { useForm } from 'react-hook-form';

import { useEffect } from 'react';
import { myInfoStyles } from '../../../../utils/constStyles';

const USER_DATA = 'userData';

const MyInfo = () => {
	const { handleSubmit, register, setValue } = useForm();

	useEffect(() => {
		try {
			console.log(1010);
			const userData = JSON.parse(localStorage.getItem(USER_DATA)) || {};

			setValue('name', userData?.name);
			setValue('age', userData?.age);
			setValue('email', userData?.email);
		} catch (error) {
			console.error(error);
		}
	}, [setValue]);

	const handleFormSubmit = (data) => {
		try {
			localStorage.setItem(USER_DATA, JSON.stringify(data));
			alert('Usuario actualizado');
		} catch (error) {
			alert('Ha ocurrido un error');
		}
	};

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
			<label className={myInfoStyles.label}>
				Name
				<input
					{...register('name', {
						required: true,
						minLength: 1,
						maxLength: 120,
					})}
					className={myInfoStyles.input}
				/>
			</label>
			<label className={myInfoStyles.label}>
				Email
				<input
					{...register('email', { required: true, min: 1, max: 200 })}
					className={myInfoStyles.input}
				/>
			</label>
			<label className={myInfoStyles.label}>
				Age
				<input
					{...register('age', {
						required: true,
						min: 1,
						max: 120,
						valueAsNumber: true,
					})}
					className={myInfoStyles.input}
					type='number'
				/>
			</label>
			<button type='submit' className={myInfoStyles.submitButton}>
				Save
			</button>
		</form>
	);
};

export default MyInfo;
