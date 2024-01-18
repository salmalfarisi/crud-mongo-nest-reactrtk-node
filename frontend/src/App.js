import Header from './components/layout/Header';

function App() {
  return (
    <div className="App">
		<Header/>
		<div className="grid grid-cols-3 gap-4">
			<div>
				<p className="text-3xl text-sky-400 font-bold underline">
				  Hello world!
				</p>
			</div>
			<div>
				<header className="App-header">
					<img src='./react-rtk.png' className="App-logo" alt="logo" />
				 </header>
			</div>
			<div>09</div>
		</div>
    </div>
  );
}

export default App;
