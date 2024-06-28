
app.post('/upload', upload.single('fileImage'),(req,res)=>{
    if(!req.file){
        return res.status(400).send('No files uploaded')
    }
    console.log(req.file);
    res.send(`File uploaded: ${req.file.filename}`)
})
// const sampleUser ={
//   f_name:'Pritish',
//   l_name:'Chawla',
//   email:'chawla.pritish@yahoo.in',
//   gender:'male',
// contact: '9216523997',
// d_o_b: '01/01/2001',
// designation: 'Student',
// hobbies:'sports',
// password:'Test@123',
// confirmPassword:'Test@123'
// }
// response = validateUser(sampleUser)
//  if(response.error){
//   console.log(error,'error in joi')
//  }
//  else {
//   console.log('Validated data is workinf in joi')
//  }