.env file
PORT = 5000
MONGODB_URI = mongodb+srv://username:password@cluster0.ka4qusr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0



Below are the some of the sample api where we can perform tests

http://localhost:5000/api/products?limit=10&offset=0&category=electronics
http://localhost:5000/api/products?limit=10&offset=0&sortBy=name&sortOrder=asc
http://localhost:5000/api/products?limit=10&offset=0&sortBy=category&sortOrder=desc
http://localhost:5000/api/products?limit=10&offset=0&sortBy=price&sortOrder=desc
http://localhost:5000/api/products?limit=10&offset=0&input=product&sortBy=price&sortOrder=desc


git product language wise modified
http://localhost:5000/api/products?language=en&sortBy=name&sortOrder=desc

get raw product list
localhost:5000/api/products


# Set up

Clone the repo or download it.

Go to the project folder and run

```sh
$ npm install
```



Start the Tailwind CLI build process

Run the CLI tool to scan your template files for classes and build your CSS in seperate terminal.:

```sh
$ npm run devcss
```


And run your server running the following command in the root of the project in seperate terminal.:

```sh
$ npm run dev
```


i want to add search functionality in which i want input parameter which accept input value and give reseaponse according to input

http://localhost:5000/api/products?limit=10&offset=0&input=product 1&sortBy=price&sortOrder=desc