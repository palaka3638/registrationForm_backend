
app.post('/upload', upload.single('fileImage'),(req,res)=>{
    if(!req.file){
        return res.status(400).send('No files uploaded')
    }
    console.log(req.file);
    res.send(`File uploaded: ${req.file.filename}`)
})