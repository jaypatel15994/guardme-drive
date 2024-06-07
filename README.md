# guardme-drive

This is project I made for a simple content management system. 

I am assuming you already have basic setup like php, git, apache, npm, etc.

To begin, clone this git repository to your local environment using 
`git clone git@github.com:jaypatel15994/guardme-drive.git guardme-clone`

`cd guardme-clone`

`cp .env.example .env`

Now create an empty database and set database connection details in .env file

run `composer install`
`npm install`
`php artisan key:generate`
`php artisan migrate`

In two separate terminals run `php artisan serve` and `npm run dev`

visit `http://127.0.0.1:8000/` in your browser or `http://localhost:8000`

Register using some email id and password.

Click on '+' and add some folders and files.