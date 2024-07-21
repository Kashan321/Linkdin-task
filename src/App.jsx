import React from 'react';
import TaxResourceForm from './Components/TaxResourceForm';
import apiResponse from './Utils/Api_Response';

function App() {
  console.log(apiResponse);
  return (
    <div className="container mx-auto p-4">
      <TaxResourceForm />
      
    </div>
  );
}

export default App;
