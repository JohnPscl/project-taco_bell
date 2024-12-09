<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Faculty Vault - Sign Up</title>
    <script src="https://unpkg.com/just-validate@latest/dist/just-validate.production.min.js" defer></script>
    <script src="/js/validation.js" defer></script>

    <!--Favicon-->
    <link rel="icon" href="./Assets/Logo/engineering_logo.ico" type="image/x-icon">

    <!--Custom CSS link-->
    <link rel="stylesheet" href="./create-account/signup.css" />
  </head>
  <body>
    <div class="mid">
      <h1>
        Faculty <span class="light-weight">Vault</span>
      </h1>
    </div>
    <div class="form-wrapper">
      <div class="form-container">
        <div class="form-header">
          <h1>Create a new account</h1>
          <p>Secure your certificates today!</p>
        </div>
        <hr />
        <form action="process-signup.php" method="POST" id="signup" novalidate>
          <div class="name-fields">
            <input type="text" id="first_name" name="first_name" placeholder="First Name" required />
            <input type="text" id="last_name" name="last_name" placeholder="Last Name" required />
          </div>

          <div class="form-control">
            <input type="email" id="email" name = "email" placeholder="Email" required />
            <small class="error-msg" id="email-error"></small>
          </div>

          <div class="form-control">
            <input type="text" id="faculty_id" name="faculty_id" placeholder="Faculty ID" required />
            <small class="error-msg" id="ID-error"></small>
          </div>

          <div class="form-control">
            <input type="password" id="password" name="password" placeholder="Password" required />
            <small class="error-msg" id="password-error"></small>
          </div>

          <div class="terms">
            <p>Users who engage with Faculty Vault may have shared your contact information with us <a href="#">Learn more.</a></p>
            <p>By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a><br />
              You may receive email or SMS notifications, which you can opt out <br>
              of at any time.</p>
          </div>

          <div class="btn">
            <form action="signin.php" method="post">
              <button>Sign Up</button>
            </form>
          </div>

          <div class="alreadysign">
            <a href="signin.php" id="signInLink">Already have an account?</a>
          </div>          
        </form>
      </div>
    </div>
  </body>
  <script src="./create-account/signup.js"></script>
</html>
