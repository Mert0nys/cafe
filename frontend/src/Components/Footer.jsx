import React from 'react'
import { Container } from 'react-bootstrap'

const About = () => (
    
        <footer className="bg-dark text-white text-center py-3">
          <div className="container">
            <p>&copy; {new Date().getFullYear()} Кафе Italy</p>
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="/about" className="text-white">О нас</a>
              </li>
              <li className="list-inline-item">
                <a href="/menu" className="text-white">Меню</a>
              </li>
              <li className="list-inline-item">
                <p className="text-white">89275508377</p>
              </li>
              
            </ul>
          </div>
        </footer>
)
export default About;
