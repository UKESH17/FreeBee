import work from '../images/work.webp'
import schedule from '../images/schedule.jpg'
import donatework from '../images/donate-work.jpg'
import aboutus from '../images/aboutus.jpeg'
import '../style/home.css'
import { useNavigate } from 'react-router-dom'

const Page3 = () => {
  const navigate=useNavigate();
  return (

    <div>
      <nav class="navbar">
        <h1 class="logo">FREEBEE</h1>
        <div class="navlin">
          <ul>
            <li id='HOME'><a href="#HOME">HOME</a></li>
            <li class="act3" id='ABOUTUS'><a href="#ABOUTUS">ABOUT US</a></li>
            <li class="ctn" id='CONTACTUS'><a href="#CONTACTUS">CONTACT US</a></li>
            <li class="log" onClick={() => { navigate("/login") }} ><a href="">LOGIN</a></li>

          </ul>
        </div>
      </nav>
      <div class="Home-image">
        <div class="header-content">
          <a href="personalform.html" >DONATE</a>
        </div>
      </div>
      {/* AboutUs */}

      <section class="aboutus" id="aboutus">
        <h1 class="heading"> ABOUTUS</h1>
        <div class="row1">
          <img src={aboutus} class="image" />

          <div class="content">
            <h3>Why choose us?</h3>
            <p>FREEBEE help the victims lacking relief amenities, with a significant focus on clean clothing.
              FREEBEE makes it super easy for you to make non-cash donations."Making a donation is the ultimate sign of solidarity.Actions speak louder than words."</p>
          </div>
        </div>
      </section>
      {/* How we work */}
      <section>
        <div class="work-heading">
          <h1>HOW WE WORK</h1>

        </div>
        <div class="row">
          <img src={work} class="laptop-img" />
          <img src={schedule} class="img2" />
          <img src={donatework} class="img3" />
          <div class="cont1">
            <p>Enter the pickup location and pickup details.</p>
          </div>
          <div class="content2">
            <p>Orphanage will schedule a pickup and collect the products.You can also choose to go for the drop off option in case you want to drop the donations yourself. </p>
          </div>
          <div class="content3">
            <p>Orphanage will come to your doorstep to pick up the donations.</p>
          </div>
        </div>
      </section>

      <section class="contactus">
        <div class="contactus-container">
          <div class="content">
            <div class="left-side">

              <div class="phone details">
                <i class="fas fa-phone-alt"></i>
                <div class="topic">Phone</div>
                <div class="text-one">+0098 9893 5647</div>
                <div class="text-two">+0096 3434 5678</div>
              </div>
              <div class="email details">
                <i class="fas fa-envelope"></i>
                <div class="topic">Email</div>
                <div class="text-one">komel7420@gmail.com</div>
                <div class="text-two">varsha@gmail.com</div>
              </div>
            </div>
            <div class="right-side">
              <div class="topic-text">CONTACT US</div>
              <form action="#">
                <div class="contactname">
                  <input type="text" placeholder="Enter your name" />
                </div>
                <div class="contactname">
                  <input type="text" placeholder="Enter your email" />
                </div>
                <div class="contactname message">
                  <input type="textarea" placeholder="Enter Message" />
                </div>
                <div class="button">
                  <input type="button" value="Send Now" />
                </div>
              </form>
            </div>
          </div>
        </div>

      </section>
      <section class="footer">
        <p>@copyrights</p>
      </section>
    </div>

  );
}

export default Page3;
