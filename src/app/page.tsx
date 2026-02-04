import ZrpButton from '../components/ui/ZrpButton';
import ZrpInput from '../components/ui/ZrpInput';


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center p-8 max-w-md mx-auto">
      
      <h1>ZRP LOGIN</h1>
      
      {/* Look how clean this is! No complex CSS here. */}
      <form className="mt-8">
        <ZrpInput label="Force Number" placeholder="Enter Force ID (e.g. 9921)" />
        <ZrpInput label="Password" type="password" placeholder="Enter Secure Pin" />
        
        <div className="mt-8">
          <ZrpButton text="Authenticate Officer" />
        </div>
      </form>

    </main>
  );
}