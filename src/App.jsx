import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Blog from './pages/Blog';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NotFound from  './pages/NotFound';
import Privacy from   './pages/Privacy';
import Terms from     './pages/Terms';
import Aboutus from   './pages/Aboutus';

import DashboardC from './pages/DashboardC'

import PricingPro from './pages/PricingPro'
import PricngBasic from './pages/PricingBasic'
import PricingEnterprice from './pages/PricingEnterprice'




import ProtectedRoute from './components/ProtectedRoute';


import TextToVideo from './pages/features/TextToVideo';
import ShortVideo from './pages/features/ShortVideo';
import VideoScriptCreator from './pages/features/VideoScript';
import ScriptEnhancer from './pages/features/VideoScriptEnhaner';













function App() {
  return (  
    <Routes>
      <Route path ="/admin/*" element ={<DashboardC/>}></Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="blog" element={<Blog />} />

          
          <Route path="pricing" element={<Pricing />} />
          
          
          
          <Route element={<ProtectedRoute />}>
          
        
          
          <Route path="ai-features/Generate Videos"  element={<TextToVideo/>} />
          <Route path="ai-features/Generate Shorts"  element={<ShortVideo/>} />
          <Route path="ai-features/Video Script"  element={<VideoScriptCreator/>} />
          <Route path="ai-features/Video Script Enhancer"  element={<ScriptEnhancer/>} />
          <Route path="pricing/pro" element={<PricingPro />} />
          <Route path="pricing/basic" element={<PricngBasic />} />
          <Route path="pricing/enterprise" element={<PricingEnterprice />} />
          
          
     
          
          


        
        
          
        </Route>
        
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="privacy" element={<Privacy/>} />
        <Route path="terms" element={<Terms/>} />
        <Route path="aboutus" element={<Aboutus/>} />
        
        
        <Route path="*" element={<NotFound />} />
      
      
      


      </Route>
    </Routes>
  );
}

export default App;