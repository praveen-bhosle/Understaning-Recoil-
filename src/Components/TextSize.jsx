import React from 'react'

import { RecoilRoot ,  atom  , selector , useRecoilState, useRecoilValue }  from 'recoil'  

const text = atom( { 
  key:'text' ,  
  default:'' 
} )     

const characterCounter = selector( { 
   key: 'characterCounter' ,   
   get: ({get}) =>  { 
      const string  =  get(text) ; 
      return  string.length  ; 
   }
}) 
 
function TextSize() {     
  return (  
    <RecoilRoot>  
      <MainApp/>  
    </RecoilRoot>
  )
}  


const MainApp = ()=> { 
  const  [text_ ,  setText ] = useRecoilState(text) ;    
  const characterCounter_ = useRecoilValue(characterCounter)

  return( 
    <> 
     <input  onChange =  {  e  =>   setText(e.target.value)   } />   
     <div>  
      {text_} 
     </div>  
     <br/> 
    <div> 
      Length of text: { characterCounter_ }   
        </div>  
    </>
  )
}   

export default TextSize 