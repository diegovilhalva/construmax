import { FiFileText, FiSettings, FiStar } from "react-icons/fi"


const DashboardHome = ({ stats }) => {
    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Resumo</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow p-6">
                        <h3 className="text-lg font-medium text-gray-600">{stat.title}</h3>
                        <div className="mt-2 flex items-baseline">
                            <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                            <span className="ml-2 text-sm text-green-500">{stat.change}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow p-6 mb-8">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Atividade Recente</h3>
                <div className="space-y-4">
                    <div className="flex items-start">
                        <div className="bg-green-100 p-2 rounded-full">
                            <FiFileText className="text-green-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-gray-800"><strong>Você</strong> publicou um novo artigo no blog</p>
                            <p className="text-gray-500 text-sm">Há 2 horas</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="bg-blue-100 p-2 rounded-full">
                            <FiStar className="text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-gray-800"><strong>Carlos Silva</strong> enviou um novo depoimento</p>
                            <p className="text-gray-500 text-sm">Há 5 horas</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="bg-yellow-100 p-2 rounded-full">
                            <FiSettings className="text-yellow-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-gray-800"><strong>Você</strong> atualizou um serviço</p>
                            <p className="text-gray-500 text-sm">Ontem</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default DashboardHome