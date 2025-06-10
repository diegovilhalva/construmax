import React from 'react'

const DashboardProjects = ({projects}) => {
    if (projects.length === 0) {
        return (
             <p className="text-center text-gray-500 mt-10">Nenhum projeto cadastrado.</p>
        )
    }
  return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Gerenciar Projetos</h2>
              <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark">
                Adicionar Projeto
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-xl shadow overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
                    <div className="flex justify-between items-center mb-4">
                      <span className={`text-sm font-medium ${
                        project.status === 'Concluído' 
                          ? 'text-green-600' 
                          : 'text-yellow-600'
                      }`}>
                        {project.status}
                      </span>
                      <span className="text-sm text-gray-500">{project.progress}% completo</span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                      <div 
                        className={`h-2 rounded-full ${
                          project.status === 'Concluído' 
                            ? 'bg-green-500' 
                            : 'bg-primary'
                        }`} 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <button className="text-sm text-blue-600 hover:text-blue-900">
                        Editar
                      </button>
                      <button className="text-sm text-red-600 hover:text-red-900">
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
}

export default DashboardProjects