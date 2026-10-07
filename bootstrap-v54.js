(()=>{
  const KEY='arydebts-v3';
  try{
    if(localStorage.getItem(KEY)!==null)return;
    const fresh={
      currency:'USD',locale:'es-US',mode:'immersive',name:'',income:0,
      incomeFrequency:'monthly',goal:'',goals:[],greeting:'',theme:'dark',
      navOrder:['home','debts','expenses','plan','more'],savings:0,
      onboarded:false,debts:[],expenses:[],calendarEvents:[],payments:[]
    };
    localStorage.setItem(KEY,JSON.stringify(fresh));
  }catch(e){}
})();
