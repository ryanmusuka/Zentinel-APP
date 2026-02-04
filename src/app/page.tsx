import ZrpButton from '../components/ui/ZrpButton';
import ZrpInput from '../components/ui/ZrpInput';


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center p-8 max-w-md mx-auto items-center text-center">
      
      <div className="login-panel">
        <div className="crest-placeholder">ZRP</div>
        <h1>OFFICER LOGIN</h1>
        <p>Restructed access: ZRP Traffic Patrol Officers Only.</p>
        <form className="mt-8 w-full max-w-md">
            <ZrpInput label="Force Number" placeholder="Enter Force Number" />
            <ZrpInput label="Password" type="password" placeholder="Enter Password" />
        
            <div className="mt-8">
                <ZrpButton text="VERIFY CREDENTIALS" />
            </div>
        </form>
      </div>

    </main>
  );
}