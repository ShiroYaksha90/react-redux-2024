import React from "react";
import ReacDOM from 'react-dom/client'
import "./index.css"

const pizzaData = [
    {
        name: "Focaccia",
        ingredients: "Bread with italian olive oil and rosemary",
        price: 6,
        photoName: "pizzas/focaccia.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Margherita",
        ingredients: "Tomato and mozarella",
        price: 10,
        photoName: "pizzas/margherita.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Spinaci",
        ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
        price: 12,
        photoName: "pizzas/spinaci.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Funghi",
        ingredients: "Tomato, mozarella, mushrooms, and onion",
        price: 12,
        photoName: "pizzas/funghi.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Salamino",
        ingredients: "Tomato, mozarella, and pepperoni",
        price: 15,
        photoName: "pizzas/salamino.jpg",
        soldOut: true,
    },
    {
        name: "Pizza Prosciutto",
        ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
        price: 18,
        photoName: "pizzas/prosciutto.jpg",
        soldOut: false,
    },
];


const App = () => {
    return (
        <div className="container">
            <Header />
            <Menu />
            <Footer />
        </div>
    )
}

const Header = () => {
    return (
        <header className="header">
            <h1>Eat & Go Pizzaria</h1>
        </header>
    )
}




const Menu = () => {
    return (
        <main className="menu">
            <h2>Our menue</h2>
            <p>All Authentic Italian cuisine, 6 creative dishes to choose from. All from our stone oven. All organic. All delisious</p>
            <ul className="pizzas">
                {pizzaData.length > 0 ?
                    pizzaData.map((pizza) => (
                        <Pizza {...pizza} key={pizza.name} />
                    ))
                    : <p>We're still working on our menu please come back later :)</p>}
            </ul>

        </main>
    )
}


const Pizza = (pizza) => {
    return (
        <li className={`pizza ${pizza.soldOut ? "sold-out" : ""}`}>
            <img src={pizza.photoName} alt={pizza.name} />
            <div>
                <h3>{pizza.name}</h3>
                <p>{pizza.ingredients}</p>
                <span>{pizza.soldOut ? "SOLD OUT" : pizza.price}</span>
            </div>
        </li>
    )
}
const Footer = () => {
    const hour = new Date().getHours()
    const openHour = 12
    const closeHour = 20
    const isOpen = hour >= openHour && hour <= closeHour
    return (

        <footer className="footer">
            {isOpen ? <Order closeHour={closeHour} /> : <p>we're happy to welcome you between {openHour}:00 and {closeHour}:00</p>}
        </footer >
    )
}

const Order = ({ closeHour }) => {
    return (<div className="order">
        <p>We'r open untile {closeHour}:00. Come visit us or order online </p>
        <button className="btn">Order</button>
    </div>)
}
const root = ReacDOM.createRoot(document.getElementById("root"))

root.render(<React.StrictMode><App /></React.StrictMode>)