import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import {
  Heart,
  Calendar,
  MapPin,
  Bell,
  Shield,
  Smartphone,
  CheckCircle,
  Baby,
  Stethoscope,
  Users,
  Activity,
  FileText,
  Navigation,
  TrendingUp,
  Award,
  HeartHandshake,
  AlertCircle,
  BookOpen,
  Clock
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <Heart className="w-8 h-8 text-pink-500 fill-pink-500 mr-2" />
              <span className="text-2xl font-bold text-gray-900">
                Materna<span className="text-pink-500">Care</span>
              </span>
            </div>

            <div className="flex items-center gap-6">
              <nav className="hidden md:flex items-center gap-6">
                <a href="#educacao" className="text-gray-600 hover:text-pink-500 font-medium transition-colors">
                  Educação
                </a>
                <a href="#funcionalidades" className="text-gray-600 hover:text-pink-500 font-medium transition-colors">
                  Funcionalidades
                </a>
                <a href="#porque" className="text-gray-600 hover:text-pink-500 font-medium transition-colors">
                  Porquê MaternaCare
                </a>
                <a href="#impacto" className="text-gray-600 hover:text-pink-500 font-medium transition-colors">
                  Nosso Impacto
                </a>
              </nav>

              <Link href="/login">
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-6 rounded-full shadow-lg hover:shadow-xl transition-all">
                  Entrar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 text-white overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Heart className="w-5 h-5 mr-2 fill-white" />
                <span className="text-sm font-medium">Cuidado para você e seu bebé</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Acompanhe sua gravidez com confiança
              </h1>

              <p className="text-xl md:text-2xl mb-8 text-pink-50 leading-relaxed">
                MaternaCare conecta você aos cuidados de saúde que você merece. Lembretes de consultas, hospitais próximos e seu histórico médico sempre à mão.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/login">
                  <Button size="lg" className="bg-white text-pink-600 hover:bg-pink-50 font-semibold text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all w-full sm:w-auto">
                    Começar Agora
                    <Heart className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <a href="#educacao">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold text-lg px-8 py-6 rounded-full w-full sm:w-auto"
                  >
                    Saber Mais
                  </Button>
                </a>
              </div>

              <div className="mt-10 flex flex-wrap gap-6 justify-center md:justify-start text-sm">
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  100% Gratuito
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Funciona Offline
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Dados Seguros
                </div>
              </div>
            </div>

            {/* Baby Icon Illustration */}

            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-3xl transform rotate-6"></div>
                <div className="relative bg-white/30 backdrop-blur-xl rounded-3xl p-8 border border-white/40">
                  <div className="flex items-center justify-center h-96">
                    <Baby className="w-48 h-48 text-white/80" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Educational Section - Importance of Early Prenatal Care */}
      <section id="educacao" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-100 rounded-full px-5 py-2 mb-6">
              <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">INFORMAÇÃO IMPORTANTE</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quando Começar o Pré-natal?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Muitas gestantes em Moçambique fazem a primeira consulta apenas no final do segundo trimestre. Vamos entender porquê começar cedo faz toda a diferença.
            </p>
          </div>

          {/* Timeline of Pregnancy */}
          <div className="mb-16">
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 p-8 md:p-12">
              <div className="flex items-start gap-4 mb-8">
                <div className="bg-amber-500 rounded-full p-3 flex-shrink-0">
                  <AlertCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    O Desafio Actual em Moçambique
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Muitas mulheres apresentam-se aos centros de saúde para a primeira consulta pré-natal apenas no final do segundo trimestre (6º-7º mês). Isso significa que perdem meses importantes de acompanhamento que poderiam prevenir complicações.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 border-2 border-red-200">
                  <div className="flex items-center mb-4">
                    <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center mr-3">
                      <span className="text-2xl font-bold text-red-600">1º</span>
                    </div>
                    <h4 className="font-bold text-gray-900">Primeiro Trimestre</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Semanas 1-12</p>
                  <div className="bg-red-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-red-800 mb-2">✓ Quando deve começar:</p>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• Logo que descobrir a gravidez</li>
                      <li>• Idealmente antes das 12 semanas</li>
                      <li>• Primeira consulta é crucial</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-orange-200">
                  <div className="flex items-center mb-4">
                    <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mr-3">
                      <span className="text-2xl font-bold text-orange-600">2º</span>
                    </div>
                    <h4 className="font-bold text-gray-900">Segundo Trimestre</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Semanas 13-26</p>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-orange-800 mb-2">⚠️ Chegada tardia comum:</p>
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>• Muitas chegam apenas aqui</li>
                      <li>• Já perderam exames importantes</li>
                      <li>• Riscos podem estar escondidos</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-purple-200">
                  <div className="flex items-center mb-4">
                    <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mr-3">
                      <span className="text-2xl font-bold text-purple-600">3º</span>
                    </div>
                    <h4 className="font-bold text-gray-900">Terceiro Trimestre</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Semanas 27-40</p>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-purple-800 mb-2">📋 Preparação final:</p>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• Preparação para o parto</li>
                      <li>• Monitoramento intensivo</li>
                      <li>• Plano de emergência</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Why Early Prenatal Care Matters */}
          <div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Porquê Começar o Pré-natal Cedo é Importante?
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white border-2 border-green-200 p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-green-100 rounded-full p-3 mr-4">
                    <Stethoscope className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">Detecção Precoce de Riscos</h4>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Pressão Alta (Pré-eclâmpsia)</p>
                      <p className="text-gray-600 text-sm">Identificar e controlar antes de se tornar grave</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Anemia</p>
                      <p className="text-gray-600 text-sm">Tratar com suplementos de ferro a tempo</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Diabetes Gestacional</p>
                      <p className="text-gray-600 text-sm">Controlar açúcar no sangue protege mãe e bebé</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Infecções</p>
                      <p className="text-gray-600 text-sm">HIV, sífilis e outras podem ser tratadas</p>
                    </div>
                  </li>
                </ul>
              </Card>

              <Card className="bg-white border-2 border-blue-200 p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <Baby className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">Desenvolvimento Saudável do Bebé</h4>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Suplementação com Ácido Fólico</p>
                      <p className="text-gray-600 text-sm">Previne malformações do sistema nervoso</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Ecografias no Tempo Certo</p>
                      <p className="text-gray-600 text-sm">Acompanhar crescimento e detectar problemas</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Vacinação</p>
                      <p className="text-gray-600 text-sm">Proteger mãe e bebé contra tétano e outras doenças</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Orientação Nutricional</p>
                      <p className="text-gray-600 text-sm">Alimentação adequada para o crescimento do bebé</p>
                    </div>
                  </li>
                </ul>
              </Card>
            </div>
          </div>

          {/* Recommended Schedule */}
          <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200 p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center bg-pink-500 text-white rounded-full px-6 py-3 mb-4">
                <Calendar className="w-6 h-6 mr-2" />
                <span className="font-bold">Calendário Recomendado pela OMS</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Mínimo de 6 Consultas Durante a Gravidez
              </h3>
              <p className="text-gray-600">
                Quanto mais cedo começar, melhor para você e seu bebé
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-pink-600 font-bold text-lg mb-3">1ª Consulta</div>
                <div className="text-3xl font-bold text-gray-900 mb-2">Até 12 semanas</div>
                <p className="text-gray-600 text-sm">Início do acompanhamento, exames iniciais, ácido fólico</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-purple-600 font-bold text-lg mb-3">2ª-3ª Consultas</div>
                <div className="text-3xl font-bold text-gray-900 mb-2">20-26 semanas</div>
                <p className="text-gray-600 text-sm">Ecografia morfológica, vacinas, monitoramento</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-indigo-600 font-bold text-lg mb-3">4ª-6ª Consultas</div>
                <div className="text-3xl font-bold text-gray-900 mb-2">30-40 semanas</div>
                <p className="text-gray-600 text-sm">Preparação para o parto, plano de emergência</p>
              </div>
            </div>

            <div className="mt-8 bg-white rounded-xl p-6 border-2 border-pink-300">
              <div className="flex items-start gap-4">
                <Clock className="w-8 h-8 text-pink-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-gray-900 text-lg mb-2">
                    💡 Lembre-se: Nunca é Tarde para Começar!
                  </p>
                  <p className="text-gray-700">
                    Mesmo que já esteja no segundo ou terceiro trimestre, procure um centro de saúde imediatamente. Cada consulta faz diferença para a sua saúde e a do seu bebé. O MaternaCare ajuda você a organizar e não perder nenhuma consulta.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Why MaternaCare - Context Section */}
      <section id="porque" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Porquê MaternaCare é Importante
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sabemos que o acesso a cuidados pré-natais em Moçambique ainda enfrenta desafios. Estamos aqui para ajudar.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white border-none shadow-lg p-8">
              <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Distância aos Hospitais
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Muitas gestantes em Moçambique vivem longe dos centros de saúde, dificultando o acesso regular às consultas pré-natais.
              </p>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <p className="text-green-800 font-medium text-sm flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  O MaternaCare ajuda você a encontrar o hospital mais próximo e planejar suas visitas com antecedência.
                </p>
              </div>
            </Card>

            <Card className="bg-white border-none shadow-lg p-8">
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Acompanhamento Regular
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Consultas pré-natais regulares são essenciais para detectar e prevenir complicações durante a gravidez.
              </p>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <p className="text-green-800 font-medium text-sm flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  Lembretes automáticos garantem que você não perca nenhuma consulta importante.
                </p>
              </div>
            </Card>

            <Card className="bg-white border-none shadow-lg p-8">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Activity className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Detecção Precoce
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Identificar sinais de alerta cedo pode fazer toda a diferença para uma gravidez saudável.
              </p>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <p className="text-green-800 font-medium text-sm flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  Sistema de monitoramento ajuda profissionais de saúde a identificar riscos rapidamente.
                </p>
              </div>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200 p-10">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-pink-500 rounded-full p-3 flex-shrink-0">
                <HeartHandshake className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Nossa Missão: Cuidar de Cada Mãe
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Acreditamos que toda mãe moçambicana merece acesso a cuidados de saúde de qualidade durante a gravidez. O MaternaCare foi criado para tornar isso possível, usando tecnologia simples que funciona para todas, em qualquer lugar do país.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section id="funcionalidades" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tudo que você precisa em um só lugar
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ferramentas simples e poderosas para acompanhar cada etapa da sua gravidez
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow p-8">
              <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                <Bell className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Lembretes de Consultas
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Nunca mais perca uma consulta pré-natal. Receba notificações automáticas e organize seu calendário de saúde.
              </p>
            </Card>

            <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow p-8">
              <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                <Navigation className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Hospitais Próximos
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Encontre rapidamente os hospitais e centros de saúde mais próximos de você, com informações de contacto.
              </p>
            </Card>

            <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow p-8">
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Histórico Médico
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Acesse todo o histórico da sua gravidez, exames e acompanhamento médico em um único lugar seguro.
              </p>
            </Card>

            <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow p-8">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                <Activity className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Monitoramento de Saúde
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Acompanhe sinais vitais, peso, pressão arterial e outros indicadores importantes da sua saúde.
              </p>
            </Card>

            <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow p-8">
              <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Identificação de Riscos
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Sistema ajuda profissionais de saúde a identificar situações que precisam de atenção especial.
              </p>
            </Card>

            <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow p-8">
              <div className="bg-gradient-to-br from-violet-100 to-purple-100 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                <Smartphone className="w-8 h-8 text-violet-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Acesso pelo Celular
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Use em qualquer lugar, a qualquer hora. Desenvolvido para funcionar até com internet limitada.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Como funciona
            </h2>
            <p className="text-xl text-gray-600">
              Três passos simples para começar a cuidar de você e seu bebé
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-full text-3xl font-bold mb-6 shadow-lg">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Crie sua conta
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Cadastre-se gratuitamente com suas informações básicas. É rápido e seguro.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-500 text-white rounded-full text-3xl font-bold mb-6 shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Complete seu perfil
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Adicione informações sobre sua gravidez e preferências de acompanhamento.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-full text-3xl font-bold mb-6 shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Comece a usar
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Pronto! Acesse todas as funcionalidades e acompanhe sua gravidez com tranquilidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impacto" className="py-20 bg-gradient-to-br from-pink-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              MaternaCare em números
            </h2>
            <p className="text-xl text-pink-100">
              Juntas, estamos construindo um futuro melhor para as mães de Moçambique
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <Users className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold mb-2">120+</div>
              <div className="text-pink-100">Gestantes Cadastradas</div>
            </div>

            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <Calendar className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-pink-100">Consultas Agendadas</div>
            </div>

            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-pink-100">Satisfação</div>
            </div>

            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <TrendingUp className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold mb-2">+40%</div>
              <div className="text-pink-100">Adesão às Consultas</div>
            </div>
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-10 text-center">
            <Award className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
            <h3 className="text-2xl font-bold mb-4">
              Nosso Objetivo: Transformar a Saúde Materna
            </h3>
            <p className="text-lg text-pink-100 max-w-3xl mx-auto leading-relaxed">
              Queremos que cada gestante em Moçambique tenha acesso fácil a cuidados pré-natais de qualidade. Com tecnologia simples e acessível, estamos a construir um futuro onde todas as mães podem acompanhar sua gravidez com confiança e segurança.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-16 h-16 text-pink-500 mx-auto mb-6 fill-pink-500" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Pronta para começar sua jornada?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Junte-se a centenas de mães que já confiam no MaternaCare para acompanhar sua gravidez.
          </p>
          <Link href="/login">
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold text-lg px-12 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all">
              Criar Conta Gratuita
              <Heart className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-xl mb-4 flex items-center">
                <Heart className="w-6 h-6 mr-2 text-pink-500 fill-pink-500" />
                MaternaCare
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Cuidando de mães e bebés em Moçambique com tecnologia e carinho.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Links Úteis</h4>
              <ul className="space-y-2">
                <li><a href="#educacao" className="hover:text-pink-400 transition-colors">Educação</a></li>
                <li><a href="#funcionalidades" className="hover:text-pink-400 transition-colors">Funcionalidades</a></li>
                <li><a href="#porque" className="hover:text-pink-400 transition-colors">Porquê MaternaCare</a></li>
                <li><a href="#impacto" className="hover:text-pink-400 transition-colors">Nosso Impacto</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-pink-400 transition-colors">Central de ajuda</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Termos de uso</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2026 MaternaCare - Todos os direitos reservados</p>
            <p className="mt-2 text-sm">Desenvolvido com ❤️ para as mães de Moçambique</p>
          </div>
        </div>
      </footer>
    </main >
  );
}