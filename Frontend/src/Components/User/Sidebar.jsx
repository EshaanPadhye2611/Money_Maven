

import React, { useState} from 'react';
import { RiComputerLine } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { IoAnalytics, IoFastFood } from "react-icons/io5";
import { GiTrophiesShelf } from "react-icons/gi";
import { BiLeaf } from "react-icons/bi";
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import { ImFileEmpty } from "react-icons/im";
import { ImBubbles2 } from "react-icons/im";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


// Set the app element for react-modal
Modal.setAppElement('#root');

const Sidebar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [donateModalIsOpen, setDonateModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openDonateModal = () => {
    setDonateModalIsOpen(true);
  };

  const closeDonateModal = () => {
    setDonateModalIsOpen(false);
  };
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/expense"); // Redirects to the /expense route
  };
  return (
    <div className="w-1/5 bg-gray-900 text-white p-6 h-[140vh] flex flex-col">
      {/* Logo Section */}
      <div>
        <h2 className="text-3xl font-bold mb-12 flex items-center">
          <FaRupeeSign className="mr-3 text-green-500 text-4xl" />Money Maven
        </h2>

        {/* Navigation Menu */}
        <ul className="space-y-8 text-lg text-center mr-16">
          <li className="flex items-center hover:text-green-400 cursor-pointer transition duration-200mt-7s">
            <RiComputerLine className="mr-3 text-2xl" />
            Dashboard
          </li>

          <Link to="/insurance">
            <li className="flex items-center hover:text-green-400 cursor-pointer transition duration-200 mt-7">
              <SlCalender className="mr-3 text-2xl" />
               Insurance
            </li>
          </Link>

          {/* <li className="flex items-center hover:text-green-400 cursor-pointer transition duration-200 mt-7">
            <IoAnalytics className="mr-3 text-2xl" />
            Stocks
          </li> */}
          
          <Link to ="/fd">
          <li className="flex items-center hover:text-green-400 cursor-pointer mt-7 px-1 py-2 rounded-lg mt-7" onClick={openModal}>
            <ImFileEmpty className="mr-3 text-2xl" />
            Fixed Deposits
          </li>
          </Link>

          {/* <li className="flex items-center hover:text-green-400 cursor-pointer mt-7 px-1 py-2 rounded-lg mt-7" onClick={openDonateModal}>
            <IoFastFood className="mr-3 text-2xl" />
            Donate Single Meal
          </li> */}

          <Link to ="/advisor">
          <li className="flex items-center hover:text-green-400 cursor-pointer transition duration-200 mt-7">
            < ImBubbles2 className="mr-3 text-2xl" />
           Consult Advisor
          </li>
          </Link>
        </ul>

        {/* Donate Section (Moved Here) */}
        <div className="text-center mt-20">
          <p className="text-2xl font-semibold mb-2 whitespace-nowrap">
            Want to track Expense?
          </p>
          <img
            src="/money.png"
            alt="Donate Food"
            className="w-24 h-24 mb-4 mx-auto rounded-full shadow-md"
          />
          
                    <button className="w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-600 transition duration-300 shadow-lg"  onClick={handleNavigate}>
                      Click here
                    </button>
                    
        </div>
      </div>

      {/* Modal for Add Food Items */}
      {/* <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Food Item"
        className="modal bg-white rounded-xl shadow-2xl w-11/12 sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto transform transition-all duration-300 ease-in-out animate-fade-in-up"
        overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <AddItem closeModal={closeModal} />
      </Modal>

      {/* Modal for Donate Single Meal */}
      {/* <Modal
        isOpen={donateModalIsOpen}
        onRequestClose={closeDonateModal}
        contentLabel="Donate Single Meal"
         className="modal bg-white rounded-xl shadow-2xl w-11/12 sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto transform transition-all duration-300 ease-in-out animate-fade-in-up"
        overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <DonateSingleMeal closeModal={closeDonateModal} />
      </Modal> */} 
    </div>
  );
};

export default Sidebar;