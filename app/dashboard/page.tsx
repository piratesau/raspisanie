export default async function DashboardPage() {
    await new Promise ((resolve)=>setTimeout(resolve, 1000))
    
    return (
        <div className='p-4 bg-emerald-50 border-2 border-emerald-500
        rounded-md'>
            <h1 className="text-xl font-bold text-black">
                Контент страницы 
            </h1>
        </div>
    );
}