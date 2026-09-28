export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-red-50">
            <div className="p-4 border-2 border-red-500 rounded-md">
                <h1 className="text-xl font-bold text-red-700">
                    Страница не найдена
                </h1>
                <img src="https://i.pinimg.com/736x/eb/24/cb/eb24cb807406daacac77e44bb58d2f2c.jpg" alt="" className="w-[100px]"/>
            </div>
        </div>
    );
}