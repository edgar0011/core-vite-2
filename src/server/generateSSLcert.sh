# https://thriveread.com/nodejs-https-server-with-express-and-createserver/
mkdir src/server/cert
cd src/server/cert
openssl genrsa -out localhost.key 2048
openssl req -new -key localhost.key -out localhost.csr -config ../ca-local.cnf
openssl x509 -req -in localhost.csr -signkey localhost.key -out localhost.crt
