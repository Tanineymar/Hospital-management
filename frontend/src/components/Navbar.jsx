function Navbar(){
    return(
        <nav className="flex justify-between items-center px-8 py-4 border-b-olive-700 bg-white  ">
            <h1 className="text-xl font-bold text-blue-600">Medi<span className="text-teal-500">Care</span></h1>

            <div className="flex gap-6 text-gray-600">
                <a href="#">HOME</a>
                <a href="#">DOCTORS</a>
                <a href="#">LAB TESTS</a>
                <a href="#">CONTACT</a>
            </div>

           <div className="flex gap-3">
             <button className="bg-white font-medium text-blue-600 px-4 py-1 border-2 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all">Login</button>
            <button className="bg-blue-600 text-white px-3 py-1 rounded-lg ">Register</button>
           </div>
        </nav>
    )
}

export default Navbar