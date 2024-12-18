<?php
session_start();

  include("connection.php");
  include("functions.php");

  $user_data = check_login($con);

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Faculty Vault: Keep Your Credentials Updated and Safe</title>

    <!--Favicon-->
    <link rel="icon" href="./Assets/Logo/engineering logo.ico" type="image/x-icon">

    <!--Custom CSS link-->
    <link rel="stylesheet" href="./Assets/overview.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">

    <!--Icon Link-->

    <script type="module" src="https://unpkg.com/ionicons@6.0.1/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@6.0.1/dist/ionicons/ionicons.js"></script>

</head>
<body>
    <div class="container">
        
        <!--NavBar-->
        <div class="nav-container">
            <nav class = main-nav>
                <a href="#intro" class="logo-container">
                    <img src="./Assets/Logo/engineering logo.png" alt="Logo" class="logo">
                </a>
                
                <ul class="nav-links">
                    <li><a href="#store">Features</a></li>
                    <li><a href="#customer" >Customer</a></li>
                    <li><a href="#team" >Team</a></li>
                    <li><a href="#contact-us" >Contact Us</a></li>
                </ul>
                <a href="signin.php">
                    <button class="sign-button">Sign In</button>
                </a>
                
            </nav>
        </div>

        <!--IntroSection-->
        <section id="intro" class="intro-container">
            <div class="credentials">
                <p>Keep your credentials<br>
                    updated and safe.</p>
            </div>
        
            <div class="intro-descript">
                <p>Securely store and track your certificates for <br>
                    easy access and professional use.</p>
            </div>
            <a href="signin.php">
                <button class="sign-inn-button">Sign In</button>
            </a>

        </section>

        <!--Features-->
        <div class="feature-container">
            <nav class="navbar" >
                <ul class="nav-items">
                <li><a href="#store" >Store</a></li>
                <li><a href="#manage">Manage</a></li>
                <li><a href="#visibility">Visibility</a></li>
                <li><a href="#security">Security</a></li>
                </ul>
            </nav>

            <!--Store-->

            <section id="store" class = "store container-features">
                <article>
                    <h1 class="features-header">
                        Storing certificates made simple
                    </h1>
                    <p class="features-descript">
                            Effortless and secure management for faculty credentials.<br>
                            Store, track, and access your certificates with ease.
                    </p>
                </article>

                <article>

                    <!-- Store Descript 1-->
                    <div class="feature1">
                        <div class="vertical-line" style="height: 120px;"></div>
                            <div class="content">
                                <button class="buttonStyle" onclick="showStoreFeature1()"><b>Local access made easy</b></button>
                                    <p class="text text1 visible">
                                        Easily access your stored certificates from <br>
                                        your local system, ensuring your important <br>
                                        documents are always within reach.
                                    </p>
                            </div>
                    </div>

                    <!--Store Descript 2-->
                    <div class="feature2">
                        <div class="vertical-line"></div>
                            <div class="content">
                                <button class="buttonStyle" onclick="showStoreFeature2()"><b>Automated backups</b></button>
                                    <p class="text text2">
                                        Your certificates are backed up securely, <br>
                                        preventing accidental data loss.
                                    </p>
                            </div>
                    </div>

                    <!--Store Descript 3-->
                    <div class="feature3">
                        <div class="vertical-line"></div>
                            <div class="content">
                                <button class="buttonStyle" onclick="showStoreFeature3()"><b>File size flexibility</b></button>
                                    <p class="text text3">
                                        Upload certificates in PDF format with size <br>
                                        limits, ensuring a smooth and organized <br>
                                        storage process.
                                    </p>
                            </div>
                    </div>    
                    <script src="./Assets/faculty.js"></script>
                </article>
            </section>
            
            <!--Manage-->

            <section id="manage" class = "manage container-features">
                <article>
                    <h1 class="features-header">
                        Keep everything in order
                    </h1>
                    <p class="features-descript">
                        Control your documents with ease—rename, delete, and review <br> 
                        details to keep everything organized and up to date.
                    </p>
                </article>

                <article>
                    
                    <!--Manage Descript 1-->
                    <div class="feature1 feature-right">
                        <div class="vertical-line" style="height: 120px;"></div>
                            <div class="content">
                                <button class="buttonStyle" onclick="showManageFeature1()"><b>Detailed file logs</b></button>
                                <p class="text text1 visible">
                                    Track when and where certificates were <br>
                                    uploaded or edited for better record- <br>
                                    keeping.
                                </p>
                            </div>
                    </div>

                    <!--Manage Descript 2-->
                    <div class="feature2 feature-right">
                        <div class="vertical-line"></div>
                            <div class="content">
                                <button class="buttonStyle" onclick="showManageFeature2()"><b>Effortless document organization</b></button>
                                    <p class="text text2">
                                        Easily categorize certificates with tags or <br>
                                        folders for improved organization.
                                    </p>
                            </div>
                    </div>

                    <!--Manage Descript 3-->
                    <div class="feature3 feature-right">
                        <div class="vertical-line"></div>
                            <div class="content">
                                <button class="buttonStyle" onclick="showManageFeature3()"><b>History tracking</b></button>
                                    <p class="text text3">
                                        View past edits or modifications made to <br>
                                        uploaded certificates. 
                                    </p>
                            </div>
                    </div>

                <script src="./Assets/faculty.js"></script>
                </article>
            </section>

            <!--Visibility-->

            <section id="visibility" class = "visibility container-features">
                <article>
                    <h1 class="features-header">
                        Streamline team oversight
                    </h1>
                    <p class="features-descript">
                        Department chairs and deans gain visibility into faculty certifications, <br>
                        ensuring transparency and collaboration across departments.
                    <p>
                </article>

                <article>

                    <!--Visibility Descript 1-->
                    <div class="feature1">
                        <div class="vertical-line" style="height: 120px;"></div>
                            <div class="content">
                                <button class="buttonStyle" onclick="showVisibilityFeature1()"><b>Role-based access control</b></button>
                                    <p class="text text1 visible">
                                        Chairs can view certificates from their <br>
                                        departments, while deans can access all <br>
                                        departments.
                                    </p>
                            </div>
                    </div>

                    <!--Visibility Descript 2-->
                    <div class="feature2">
                        <div class="vertical-line"></div>
                            <div class="content">
                                <button class="buttonStyle" onclick="showVisibilityFeature2()"><b>Real-time updates</b></button>
                                    <p class="text text2">
                                        Professors, chairs, and deans can see  <br>
                                        updates to certifications as soon as they <br>
                                        are uploaded.
                                    </p>
                            </div>
                    </div>

                    <!--Visibility Descript 3-->
                    <div class="feature3">
                        <div class="vertical-line"></div>
                            <div class="content">
                                <button class="buttonStyle" onclick="showVisibilityFeature3()"><b>Simplified reviews</b></button>
                                    <p class="text text3">
                                        Easily share or present certification <br>
                                        records during department reviews or <br>
                                        accreditation processes.
                                    </p>
                            </div>
                    </div>

                    <script src="./Assets/faculty.js"></script>
                </article>
            </section>

            <!--Security--> 

            <section id="security" class = "security container-features">
                <article>
                    <h1 class="features-header">
                        Data protection you can trust
                    </h1>
                    <p class="features-descript">
                        Your certificates are safeguarded with top-tier security protocols, <br>
                        ensuring that only authorized users have access.
                    <p>
                </article>

                <article>

                    <!--Security Descript 1-->
                    <div class="feature1 feature-right">
                        <div class="vertical-line" style="height: 120px;"></div>
                            <div class="content">
                                <button class="buttonStyle" onclick="showSecurityFeature1()"><b>Encryption and secure storage</b></button>
                                    <p class="text text1 visible">
                                        All certificates are encrypted and stored <br>
                                        securely, protecting sensitive data.
                                    </p>
                            </div>
                    </div>

                    <!--Security Descript 2-->
                    <div class="feature2 feature-right">
                        <div class="vertical-line"></div>
                            <div class="content">
                                <button class="buttonStyle" onclick="showSecurityFeature2()"><b>Multi-factor authentication (MFA)</b></button>
                                    <p class="text text2">
                                        Enhance your account’s security with <br>
                                        additional layers of protection during <br>
                                        sign-in.
                                    </p>
                            </div>
                    </div>

                    <!--Security Descript 3-->
                    <div class="feature3 feature-right">
                        <div class="vertical-line"></div>
                            <div class="content">
                                <button class="buttonStyle" onclick="showSecurityFeature3()"><b>Activity monitoring</b></button>
                                    <p class="text text3">
                                        Stay informed with real-time alerts and  <br>
                                        logs of any suspicious activity or access <br>
                                        attempts.
                                    </p>
                            </div>
                    </div>

                <script src="./Assets/faculty.js"></script>
                </article>
            </section>
        </div>

        <!--Customer-->

        <section class="container-customer">
            <div class="customer-text-container">
                <article>
                    <h1 id="customer" class="customer-header">
                        Engineered for academic <br>
                        professionals
                    </h1>
                        <p class="customer-descript">
                            Our platform is designed specifically for 
                            the Faculty of Engineering at the University 
                            of the East, Manila campus. It provides professors 
                            and academic leaders with a secure and organized system 
                            to manage their certificates. Department chairs and deans 
                            within the engineering faculty use the platform to streamline 
                            document management, ensuring easy access to faculty achievements 
                            and records.
                        </p>
                </article>
            </div>

            <div class="customer-image-container">
                <img class="customer1-image" src="./Assets/Logo/engineering logo.png" alt="customer">
            </div>
        </section>

        <!--Team-->
        <section id="team" class="team-header">
            <div class="team-intro">
                <h1 class="meet-text">
                    Meet <br>
                    <strong class="team-text">The Team</strong>
                </h1>
            </div>
        </section>
            <section class="container-team">

                <!--JP-->
                <section class="individual-team-container">
                    <figure class="team-img-container-left">
                        <img class="indiv-team-img-left" src="./Assets/Team/project-head.jpg" alt="Project Head">
                    </figure>

                    <article class="text-team-container-left">
                        <div>
                            <h1 class="text-team-name-left">
                                    JOHN PAUL PASCUAL
                            </h1>
                            <h2 class="text-team-position-left">
                                PROJECT HEAD + WEB DEVELOPER
                            </h2>
                            <p class="text-team-descript-left">
                                Currently residing in Pasig City, John Paul Pascual is a 
                                3rd-year BS Computer Engineering student at the University 
                                of the East - Manila Campus. With a basic background in Python, 
                                SQL, and web development, he is continually expanding his technical 
                                knowledge while applying leadership and management skills to various 
                                projects.
                                <br>
                                <br>
                                John Paul serves as the Vice President of the Society of Computer 
                                Engineering Students (2024-2025) and has experience in project management, 
                                design, and consulting. As both the Project Head and Web Developer for this 
                                initiative, he combines his growing technical expertise with a passion for leading 
                                and supporting his team.
                                <br>
                                <br>
                                Driven by the belief that leadership is not about the title, but about influencing 
                                and teaching others, John Paul leads with the goal of fostering collaboration and growth 
                                within his team.
                            </p>
                        </div>
                    </article>
                </section>

                <!--EJ-->
                <section class="individual-team-container">

                    <article class="text-team-container-right">
                        <div>
                            <h1 class="text-team-name-right">
                                EARL JIM CORREA
                            </h1>
                            <h2 class="text-team-position-right">
                                WEB DEVELOPER
                            </h2>
                            <p class="text-team-descript-right">
                                I am Earl Jim Correa, a passionate 3rd-year BS Computer Engineering student at the University of the East - Manila,
                                originally from Rizal. With a strong curiosity for technology and innovation, I have delved into various fields, 
                                including software development, cybersecurity, and hardware design. I am driven by the goal of applying my skills 
                                and knowledge to solve real-world challenges while contributing meaningfully to the advancement of the tech industry.
                                <br>
                                <br>
                                Through my academic journey and participation in workshops, hackathons, and collaborative
                                projects, I have developed strong analytical thinking, troubleshooting abilities, and teamwork skills. 
                                I thrive on learning new technologies and continuously improving my craft, preparing myself for a
                                future where I can innovate and create impactful solutions.
                            </p>
                        </div>
                    </article>
                    <figure class="team-img-container-right">
                        <img class="indiv-team-img-right" src="./Assets/Team/ejcorrea.HEIC" alt="Project Head">
                    </figure>
                </section>

                <!--YSA-->
                <section class="individual-team-container">
                    <figure class="team-img-container-left">
                        <img class="indiv-team-img-left" src="./Assets/Team/project-head.jpg" alt="Project Head">
                    </figure>

                    <article class="text-team-container-left">
                        <div>
                            <h1 class="text-team-name-left">
                                MARIELLE YSABELA REGASPE
                            </h1>
                            <h2 class="text-team-position-left">
                                WEB DEVELOPER
                            </h2>
                            <p class="text-team-descript-left">
                                Currently residing in Pasig City, John Paul Pascual is a 
                                3rd-year BS Computer Engineering student at the University 
                                of the East - Manila Campus. With a basic background in Python, 
                                SQL, and web development, he is continually expanding his technical 
                                knowledge while applying leadership and management skills to various 
                                projects.
                                <br>
                                <br>
                                John Paul serves as the Vice President of the Society of Computer 
                                Engineering Students (2024-2025) and has experience in project management, 
                                design, and consulting. As both the Project Head and Web Developer for this 
                                initiative, he combines his growing technical expertise with a passion for leading 
                                and supporting his team.
                                <br>
                                <br>
                                Driven by the belief that leadership is not about the title, but about influencing 
                                and teaching others, John Paul leads with the goal of fostering collaboration and growth 
                                within his team.
                            </p>
                        </div>
                    </article>
                </section>

                <!--YSA-->
                <section class="individual-team-container">

                    <article class="text-team-container-right">
                        <div>
                            <h1 class="text-team-name-right">
                                AXLE GLENN JIMENEZ
                            </h1>
                            <h2 class="text-team-position-right">
                                BACK-END DEVELOPER
                            </h2>
                            <p class="text-team-descript-right">
                                Currently residing in Pasig City, John Paul Pascual is a 
                                3rd-year BS Computer Engineering student at the University 
                                of the East - Manila Campus. With a basic background in Python, 
                                SQL, and web development, he is continually expanding his technical 
                                knowledge while applying leadership and management skills to various 
                                projects.
                                <br>
                                <br>
                                John Paul serves as the Vice President of the Society of Computer 
                                Engineering Students (2024-2025) and has experience in project management, 
                                design, and consulting. As both the Project Head and Web Developer for this 
                                initiative, he combines his growing technical expertise with a passion for leading 
                                and supporting his team.
                                <br>
                                <br>
                                Driven by the belief that leadership is not about the title, but about influencing 
                                and teaching others, John Paul leads with the goal of fostering collaboration and growth 
                                within his team.
                            </p>
                        </div>
                    </article>
                    <figure class="team-img-container-right">
                        <img class="indiv-team-img-right" src="./Assets/Team/project-head.jpg" alt="Project Head">
                    </figure>
                </section>
            </section>

        <!--Footer-->
        <footer id="contact-us">
            <div class = "footer-container">

                <!--Email-->
                <div class="footer-section">
                    <h2 class="footer-header">Connect with us</h2>
                    <h3 class="footer-subheader">Email</h3>
                    <a class="business-content" href="mailto:facultyvault@gmail.com">
                        facultyvault@gmail.com
                    </a>
                </div>

                <!--Socials-->
                <div class="footer-section">
                    <h2 class="footer-header"><br></h2>
                    <h3 class="footer-subheader">Social Media</h3>
                    <a class="footer-icon" href="mailto:facultyvault@gmail.com">
                        <ion-icon name="mail-outline"></ion-icon>
                    </a>
                    <a class="footer-icon" href="https://www.facebook.com/profile.php?id=61566872354382">
                        <ion-icon name="logo-facebook"></ion-icon>
                    </a>
                    <a class="footer-icon" href="https://www.facebook.com/profile.php?id=61566872354382">
                        <ion-icon name="logo-instagram"></ion-icon>
                    </a>
                </div>

                <!--Location-->
                <div class="footer-section">
                    <h2 class="footer-header">Locate us</h2>
                    <h3 class="footer-subheader">Address</h3>
                    <a class="footer-location" href="https://maps.app.goo.gl/TeNrZu5ptigXkH3B9">
                        NCR, Manila City
                    </a>
                    <br>
                    <a class="footer-location" href="https://maps.app.goo.gl/dcWYX138mXAjihjb7">
                        NCR, Pasig City
                    </a>
                </div>
            </div>
        </footer>
    </div>
</body>
</html>