import multer  from 'multer';

const upload = multer({ dest: './public/uploads/' });

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

async function handler(req, res) {
  try {
     await runMiddleware(req, res, upload.single("file"))
  } catch (e) {
   /* handle error */
  }
  const file = req.file
  return res.json(file.filename)
}

export const config = {
    api: {
        bodyParser: false,
    },
};

export default handler