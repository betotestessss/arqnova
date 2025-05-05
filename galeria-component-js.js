// Componente de galeria usando React
const { useState, useEffect } = React;

// Dados dos projetos para a galeria
const projetosData = [
    {
        id: 1,
        titulo: "Torre Empresarial Horizon",
        categoria: "Comercial",
        local: "São Paulo",
        ano: 2023,
        imagem: "/api/placeholder/800/600",
        tags: ["corporativo", "sustentável", "moderno"]
    },
    {
        id: 2,
        titulo: "Residencial Eco Gardens",
        categoria: "Residencial",
        local: "Curitiba",
        ano: 2022,
        imagem: "/api/placeholder/800/600",
        tags: ["residencial", "sustentável", "natureza"]
    },
    {
        id: 3,
        titulo: "Centro Cultural Nexus",
        categoria: "Institucional",
        local: "Rio de Janeiro",
        ano: 2024,
        imagem: "/api/placeholder/800/600",
        tags: ["cultura", "arte", "público"]
    },
    {
        id: 4,
        titulo: "Complexo Empresarial Green Tower",
        categoria: "Comercial",
        local: "Belo Horizonte",
        ano: 2023,
        imagem: "/api/placeholder/800/600",
        tags: ["corporativo", "sustentável", "certificação"]
    },
    {
        id: 5,
        titulo: "Museu Contemporâneo",
        categoria: "Institucional",
        local: "Salvador",
        ano: 2021,
        imagem: "/api/placeholder/800/600",
        tags: ["cultura", "arte", "moderno"]
    },
    {
        id: 6,
        titulo: "Edifício Residencial Skyline",
        categoria: "Residencial",
        local: "Brasília",
        ano: 2022,
        imagem: "/api/placeholder/800/600",
        tags: ["residencial", "alto padrão", "urbano"]
    },
    {
        id: 7,
        titulo: "Hospital Central Vitae",
        categoria: "Institucional",
        local: "Porto Alegre",
        ano: 2024,
        imagem: "/api/placeholder/800/600",
        tags: ["saúde", "tecnologia", "humanizado"]
    },
    {
        id: 8,
        titulo: "Shopping Garden Mall",
        categoria: "Comercial",
        local: "Fortaleza",
        ano: 2023,
        imagem: "/api/placeholder/800/600",
        tags: ["varejo", "lazer", "sustentável"]
    },
    {
        id: 9,
        titulo: "Condomínio Vista Verde",
        categoria: "Residencial",
        local: "Florianópolis",
        ano: 2021,
        imagem: "/api/placeholder/800/600",
        tags: ["residencial", "natureza", "sustentável"]
    }
];

// Componente de Filtro
const FilterBar = ({ categorias, filtroAtual, setFiltroAtual, view, setView }) => {
    return (
        <div className="filter-bar">
            <div className="filter-categories">
                <button 
                    className={filtroAtual === "todos" ? "active" : ""} 
                    onClick={() => setFiltroAtual("todos")}
                >
                    Todos
                </button>
                {categorias.map(cat => (
                    <button 
                        key={cat}
                        className={filtroAtual === cat ? "active" : ""} 
                        onClick={() => setFiltroAtual(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>
            <div className="view-toggle">
                <button 
                    className={view === "grid" ? "active" : ""} 
                    onClick={() => setView("grid")}
                >
                    <i className="fas fa-th"></i>
                </button>
                <button 
                    className={view === "list" ? "active" : ""} 
                    onClick={() => setView("list")}
                >
                    <i className="fas fa-list"></i>
                </button>
            </div>
        </div>
    );
};

// Componente de Card de Projeto
const ProjetoCard = ({ projeto, view }) => {
    return (
        <div className={`projeto-card ${view}`}>
            <div className="projeto-imagem">
                <img src={projeto.imagem} alt={projeto.titulo} />
                <div className="projeto-overlay">
                    <div className="projeto-detalhes">
                        <h3>{projeto.titulo}</h3>
                        <p className="projeto-categoria">{projeto.categoria}</p>
                        <div className="projeto-meta">
                            <span><i className="fas fa-map-marker-alt"></i> {projeto.local}</span>
                            <span><i className="fas fa-calendar"></i> {projeto.ano}</span>
                        </div>
                        <div className="projeto-tags">
                            {projeto.tags.map(tag => (
                                <span key={tag} className="tag">{tag}</span>
                            ))}
                        </div>
                        <button className="btn-ver-projeto">
                            <i className="fas fa-plus"></i> Ver Detalhes
                        </button>
                    </div>
                </div>
            </div>
            {view === "list" && (
                <div className="projeto-info-list">
                    <div>
                        <h3>{projeto.titulo}</h3>
                        <p className="projeto-categoria">{projeto.categoria}</p>
                        <div className="projeto-meta">
                            <span><i className="fas fa-map-marker-alt"></i> {projeto.local}</span>
                            <span><i className="fas fa-calendar"></i> {projeto.ano}</span>
                        </div>
                    </div>
                    <button className="btn-ver-projeto">
                        <i className="fas fa-plus"></i> Ver Detalhes
                    </button>
                </div>
            )}
        </div>
    );
};

// Componente principal da Galeria
const GaleriaInterativa = () => {
    const [projetos, setProjetos] = useState([]);
    const [filtroAtual, setFiltroAtual] = useState("todos");
    const [view, setView] = useState("grid");
    const [isLoading, setIsLoading] = useState(true);
    
    // Extrair categorias únicas
    const categorias = [...new Set(projetosData.map(p => p.categoria))];
    
    useEffect(() => {
        // Simular carregamento dos dados
        setTimeout(() => {
            setIsLoading(false);
            setProjetos(projetosData);
        }, 800);
    }, []);
    
    // Filtrar projetos
    const projetosFiltrados = filtroAtual === "todos" 
        ? projetos 
        : projetos.filter(p => p.categoria === filtroAtual);
    
    if (isLoading) {
        return (
            <div className="galeria-loading">
                <i className="fas fa-spinner fa-pulse"></i>
                <p>Carregando projetos...</p>
            </div>
        );
    }
    
    return (
        <div className="galeria-container">
            <FilterBar 
                categorias={categorias} 
                filtroAtual={filtroAtual} 
                setFiltroAtual={setFiltroAtual}
                view={view}
                setView={setView}
            />
            
            <div className={`projetos-grid view-${view}`}>
                {projetosFiltrados.length > 0 ? (
                    projetosFiltrados.map(projeto => (
                        <ProjetoCard 
                            key={projeto.id} 
                            projeto={projeto}
                            view={view}
                        />
                    ))
                ) : (
                    <div className="no-results">
                        <i className="fas fa-search"></i>
                        <p>Nenhum projeto encontrado para esta categoria.</p>
                    </div>
                )}
            </div>
            
            <div className="galeria-footer">
                <p>Exibindo <strong>{projetosFiltrados.length}</strong> de <strong>{projetos.length}</strong> projetos</p>
            </div>
        </div>
    );
};

// Renderizar o componente no elemento React designado
ReactDOM.render(<GaleriaInterativa />, document.getElementById('galeria-react'));
