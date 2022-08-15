export default function Custom404() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
      <header style={{height: '3.5rem', backgroundColor: '#3130BD', width: '100vw'}}></header>
      <div style={{height: 'inherit', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <div style={{width: '100%', textAlign: 'center'}}>
          <div style={{fontWeight: 'lighter'}}>
            404 - Ничего не найдено / 404 - Барак табылган жок
          </div>
          <div style={{padding: '.4em'}}><a href="/" style={{textDecoration: 'none', fontWeight: 'bold'}}>На главную/Негизги бетке</a></div>
        </div>
      </div>
    </div>
  );
}