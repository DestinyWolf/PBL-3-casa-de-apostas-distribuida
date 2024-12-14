# **Introdução**

O mercado de apostas online cresceu exponencialmente nos últimos anos, impulsionado pela crescente digitalização e pela busca por experiências mais personalizadas. Neste contexto, o desenvolvimento de uma aplicação distribuída de apostas, baseada em tecnologia blockchain, representa uma grande inovação. O presente trabalho apresenta o desenvolvimento de uma aplicação distribuída de apostas online diversas.   
Construída sobre a plataforma Ethereum, a aplicação oferece aos usuários um ambiente seguro e transparente para realizar suas apostas. Através da implementação de contratos inteligentes, pode-se automatizar as operações, eliminar intermediários e garantir a imutabilidade dos registros. Este relatório detalha os conceitos abordados durante o desenvolvimento, o processo de implementação e os resultados alcançados, demonstrando a viabilidade da solução proposta

# 

# **Fundamentação teórica**

## **Distributed Ledger Technology**

Distributed ledger technology (DLT) são redes peer-to-peer (P2P) que permitem que  múltiplos nós ou aparelhos computacionais armazenem uma cópia idêntica de um *ledger* distribuído. Diferentemente de sistemas distribuídos comuns, este tipo de arquitetura permite que seus membros verifiquem, executem e salvem suas próprias transações de forma segura, sem a necessidade de entidades intermediárias. (HEDERA, s.d.)  
Rauchs et. al. aprofunda o conceito DLT definindo a tecnologia como um sistema de registros eletrônicos que apresenta uma rede de participantes independentes que estabelece um consenso acerca da ordenação autoritária das transações criptograficamente validadas. A persistência dos registros é assegurada por meio da replicação dos dados em múltiplos nós da rede, enquanto a segurança é garantida pela vinculação criptográfica entre os mesmos.   
Ainda segundo Rauchs et. al. (2018), o *ledger* distribuído é um conjunto autoritário de transações projetado especificamente para o armazenamento dos dados, garantindo a segurança e integridade dos mesmos. Essa estrutura é armazenada de forma coletiva por uma parte significativa da rede, demonstrando alta resistência a diversas ameaças incluindo censura, adulteração e interferências adversas.   
Figura 1 ilustra de forma comparativa as arquiteturas de rede centralizada, distribuída tradicional e DLT, destacando a participação dos atores envolvidos nos processos de entrada e saída, armazenamento e processamento de informações. Apesar dos três tipos de arquitetura receberem entradas de diversas fontes, os participantes nos processos de armazenamento e processamento, além do controle sobre a rede,  diferem entre eles.

Figura 1: Comparação entre as arquiteturas de rede centralizada, distribuída e DLT  
Fonte: Rauchs et. al., 2018 (adaptada)  
Conforme apresentado por Hedera (s.d.) e LBank Exchange (2022), as DLTs são categorizadas em quatro classes distintas: *public* e *permissioned*;  *public* e *permissionless*; *private* e *permissioned*; e *private*  e *permitionless*. A seguir, cada uma dessas categorias será definida com base nos autores mencionados:

1. *public* e *permissioned*: DLTs desta categoria permitem a adição e remoção da aplicação em produção de modo anônimo, sem a necessidade notificar os demais participantes ou o cumprimento de critérios estabelecidos por outras aplicações. Neste tipo, os participantes da rede devem ser convidados.  
2. *public* e *permissionless*: nesta categoria, a adição e remoção da aplicação em produção de modo anônimo, sem a necessidade notificar os demais participantes ou o cumprimento de critérios estabelecidos por outras aplicações. Este é o tipo mais descentralizado, pois os membros anonimamente participam e contribuem livremente.  
3. *private* e *permissioned*: DLTs desta categoria exigem que as aplicações e os nós sejam convidados para participar da rede. Neste modelo, os participantes devem cumprir requisitos previamente estabelecidos, podendo ser necessário alguma forma de identificação. Dentre as quatro classes, esta destaca-se pelo alto grau de centralização.  
4. *private*  e *permitionless*: nesta categoria,  a participação na rede é restrita a aplicações convidadas, as quais podem ser removidas sem aviso prévio. Os nós que constituem a rede podem participar e contribuir de forma anônima e autônoma.

Conforme Hedera (s.d.), uma das grandes vantagens dos sistemas DLT é a garantia de transações rápidas e seguras sem a necessidade de entidades intermediárias. A ausência de mediadores, a distribuição do controle do *legder*  e a transparência dos registros garantem a DLTs uma plataforma de transações eficiente, acessível e segura.  
Ainda segundo Hedera (s.d.), a consistência do *ledger* em um sistema DLT é assegurada através de algoritmos de consenso que garantem que todas as réplicas do *ledger* sejam idênticas. O alto custo computacional por transação, requerido para a manutenção do consenso, é dividido entre os participantes da DLT. Dessa forma, cada participante cede um pouco do seu poder de processamento à rede.

## **Algoritmos de consenso**

Algoritmos de consenso são protocolos que visam obter um acordo unânime ou majoritário entre processos distribuídos (ou sistemas) acerca de um valor ou decisão. Uma vez definido, este acordo é final e irreversível. Este método é fundamental para a consistência e confiabilidade de sistemas distribuídos, podendo prosseguir  desde que a maioria dos participantes esteja disponível . (GLAZER, 2018, RAFT, s.d., GEEKS FOR GEEKS, 2024\)   
No contexto dos sistemas distribuídos, os algoritmos de consenso são projetados para atender a diferentes requisitos (GEEKS FOR GEEKS, 2024):

1. Algoritmos tolerantes a falhas como Raft e Paxos toleram atrasos de rede e/ou falha de nós durante o processo de acordo;  
2. Algoritmos tolerantes a falhas bizantinas como Practical *Bizantine Fault Tolerance* (PBFT) e Tendermint (desenvolvido especificamente para redes blockchain) são capazes de garantir a integridade do sistema, mesmo na presença de de nós que atuam de forma arbitrária ou maliciosa;  
3. Algoritmos de eleição de líderes coordenam dinamicamente a seleção de um líder para gerenciar os processos de consenso ou replicação de logs. Em caso de falha do líder, um novo é eleito;  
4. Algoritmos baseados em prova utilizam sistemas de verificação probabilística para determinar o estado do sistema distribuído.

Segundo Glazer (2018), em sistemas de criptomoedas, os algoritmos de consenso são aplicados na validação e distribuição das transações entre os múltiplos participantes, garantindo a confiabilidade e a segurança da plataforma. Dentre as diversas implementações, destacam-se os algoritmos *Proof-of-Work* (PoW), *Proof-of-Stake* (PoS), *Delegated Proof-of-Stake* (DPos), e *Byzantine Fault Tolerance* (BFT), as quais serão discutidos a seguir de acordo com o Glazes (2018) e Geeks for Geeks (2024).  
PoW é um algoritmo robusto e seguro aplicado principalmente a criptomoedas. Este método requer que os participantes resolvam puzzles criptográficos complexos, mas fáceis de serem verificados por outros na rede, para a validação das transações. O alto custo computacional exigido dificulta a alteração dos blocos de dados, contribuindo para a segurança do algoritmo. Apesar da sua robustez, PoW apresenta um alto custo energético e um baixo throughput.  
Diferente do PoW,  o algoritmo de consenso PoS apresenta uma melhor eficiência energética. Neste método, os validadores das transações são determinados com base na quantidade de tokens que possuem e proporcionalmente ao valor que apostam como garantia. Neste algoritmo, o risco de perder os tokens incentiva os validadores a agir honestamente.  
DPoS é um algoritmo escalável e que apresenta verificações rápidas de transações. Neste algoritmo, os detentores de tokens votam em um grupo que irá validar o bloco de transações. Apesar de manter a descentralização ao incluir toda a rede no processo de seleção de validadores, este método detém uma parte centralizada ao permitir que um pequeno grupo tome decisões acerca das transações.  
Por fim, BFT é um algoritmo que permite que os validadores, ou generais, gerenciem independentemente  o estado de uma cadeia e enviem mensagens entre si para garantir a validação correta de uma transação, além da honestidade. Este modelo, apesar de introduzir um nível de centralização, apresenta alta escalabilidade e baixo custo computacional por transação.

## **Blockchain technology**

Blockchain technology consiste em um banco de dados distribuído projetado para gerenciar um *ledger.* Neste tipo específico de DLT, as transações são organizadas em blocos vinculados por meio de uma validação criptográfica e armazenadas em um banco de dados público (chain).(BANCO CENTRAL DO BRASIL, 2017, CRIPTO CRUMB SNATCHERS, 2023\)  
Segundo o Banco Central do Brasil (2017), a tecnologia blockchain, em sua concepção original,  utilizava uma arquitetura de rede P2P composta de nós clientes e servidores (ou mineradores). Os nós classificados como clientes são definidos como qualquer aparelho que interage com a rede a fim de usufruir de um serviço prestado pela mesma. Por sua vez, os nós mineradores verificam e mantêm a integridade dos registros e do *legder.*  
Os nós clientes solicitam aos servidores o armazenamento de transações. A autenticidade e propriedade *non-repudiation* (modificação solicitada por membros autorizados o quais não podem negar sua participação ao mesmo tempo) destas solicitações são garantidas através de chaves públicas. Por conseguinte, os nós mineradores atuam reunindo as transações em blocos e tentando cunhá-los ao *ledger* através da resolução de *puzzles* criptográficos, provando que os recursos computacionais foram dedicados à atualização (PoW). (BANCO CENTRAL DO BRASIL, 2017\)  
Os nós servidores são recompensados pelo seu trabalho por meio de criptomoedas. Criptomoedas são tokens virtuais encriptados que são trocados por meio de redes descentralizadas. Estas moedas podem ser vendidas, compradas ou ganhas através da participação da rede (HEDERA, s.d).  
A combinação entre criptografia assimétrica, consenso e PoW garante à tecnologia blockchain resistência a falhas bizantinas, ataques Sybil e gasto duplo.

## **Modelo de falhas**

Segundo Rhim (2024), a alta complexidade dos sistemas distribuídos, decorrente da diversidade de componentes e de plataformas de desenvolvimento,os torna propensos a uma variedade de problemas. Usualmente, dentre estas disfunções destacam-se os três tipos listados abaixo. Figura 2 ilustra o relacionamento entre os três conceitos. 

1. *Fault* é definido como um comportamento inesperado ou anormal de um componente do sistema que pode levar a um *error* e, possivelmente, a uma *failure*. Podem ser classificadas de acordo com a causa ou a frequência que ocorrem  
2. *Error* é caracterizado por um estado incorreto do sistema resultante de *fauts;*  
3. *Failure* é definida como um evento que ocorre quando um sistema não consegue fornecer o serviço ou resultado esperado, decorrente de um *error*.

A falha em um nó do sistema pode propagar-se para toda a rede, deixando-a indisponível. Consequentemente, o entendimento dos erros que podem ocorrer na rede é essencial para o projeto de sistemas capazes de manter seu funcionamento, mesmo diante de eventuais falhas. A tolerância a falhas pode ser alcançada por meio de mecanismos como redundância, consenso, checkpoints, balanço de carga e replicação de dados. Estes mecanismos agregam disponibilidade, confiabilidade, segurança e manutenibilidade ao sistema. 

Figura 2: Correlação entre *fault, error* e *failure*  
Fonte: Rhim, 2024 (adaptado)  
O modelo de falhas é uma representação do sistema que auxilia na detecção e análise de falhas. Em outras palavras, esta ferramenta ajuda a identificar quais componentes podem falhar, por que e quais os efeitos da falha. Tabela 1 lista os tipos de modelos de falhas usuais e suas respectivas descrições.

| Tipos de falhas | Descrição |
| :---: | :---: |
| *Timing* | Um nó do sistema transmite informações fora do intervalo de tempo determinado |
| *Omission* | Uma mensagem que aparentemente nunca foi transmitida. Pode ser classificado como *send omission* ou *receive omission* |
| *Crash* | Um nó, após sofrer uma falha de omissão, para de de funcionar completamente |
| *Response* | Um nó envia uma mensagem incorreta, seja um valor incorreto ou por um fluxo de controle incorreto |
| *Arbitrary* | Um nó gera respostas aleatórias em tempos aleatórios (comportamento inconsistente).Também chamado de bizantina. |

Quadro 1: Tipos de modelos de falhas  
Fonte: Rhim, 2024 (adaptado)

## **Smart Contract**

*Smart contracts*, ou contratos inteligentes, são contratos digitais autoexecutáveis,  armazenados na blockchain, que se baseiam em uma lógica condicional para realizar ações específicas quando um conjunto de pré-requisitos são atendidos e verificados. Uma vez implementados, estes contratos são imutáveis, garantindo a transparência e segurança das transações. (IBM, s.d., ETHEREUM.ORG, 2024a)  
A formalização de um contrato inteligente envolve a definição técnica das condições, compreendendo a representação das transações e dos dados na blockchain, as regras lógicas que regem as transações e os mecanismos para lidar com eventos excepcionais e controversos. (ETHEREUM.ORG, 2024a)  
Os contratos inteligentes asseguram uma maior agilidade e eficiência, uma vez que as ações são executadas de forma imediata no momento em que as condições são atendidas. Outra característica positiva desta estrutura é a transparência das operações, possível devido a  ausência de entidades intermediárias. (IBM, s.d.)

## **Etherium e dApps**

Ethereum é uma plataforma blockchain que permite a execução de contratos inteligentes. Esta característica o torna um ambiente seguro e transparente para o desenvolvimento de aplicativos descentralizados, resistentes à censura. O Ethereum apresenta um computador embarcado à blockchain, o Ethereum Virtual Machine (EVM). (ETHEREUM.ORG, 2024b)  
De forma geral, EVM é um computador canônico único cujo estado é replicado e propagado por consenso entre todos os nós da rede Etherium. Qualquer participante pode submeter à EVM solicitações de processamento arbitrário (chamadas requisições de transações), as quais são verificadas e  executadas pelos demais nós da rede.  O registro de todas as transações e o estado da EVM são armazenados na blockchain (ETHEREUM.ORG, 2024b).  
Os aplicativos distribuídos (dApps) são aplicações desenvolvidas sobre redes descentralizadas que integram contratos inteligentes a interfaces gráficas. As principais vantagens dos dApps são a integridade dos dados, a resistência à censura e a privacidade. Em contrapartida, as grandes desvantagens deste modelo são a manutenção e o overhead da performance. (ETHEREUM.ORG, 2024c)  
A criptomoeda nativa da plataforma Ethereum é o Ether, a qual estimula economicamente os a verificar e executar requisições de transações, além de ceder poder de processamento à rede. 

# **Metodologia**

## **Arquitetura do sistema**

A arquitetura da aplicação distribuída desenvolvida é composta por três camadas: camada de aplicação, camada de negócios e camada intermediária. A camada de apresentação, ou frontend, fornece uma interface gráfica intuitiva para os usuários, permitindo que os mesmos usufruam das funcionalidades de forma simples e fácil. Esta camada foi desenvolvida utilizando Next.js, um framework React que permite a criação de aplicações web de alta performance e com excelente experiência do usuário.  
Implementada sobre a rede Ethereum, a camada de negócios, ou backend, é responsável pela lógica de negócios, gerenciando dados e processando as requisições advindas da camada intermediária. Nesta camada, os contratos inteligentes *work token, betContract* e *distributedBet* são armazenados.  
Por fim, a camada intermediária, desenvolvida com Web3, realiza a comunicação entre a interface gráfica e a blockchain da Ethereum. Figura 3 apresenta as camadas do dApp, bem como as entidades do sistema. 

Figura 3: Camadas e entidades do dApp  
Fonte: Os autores

## **Smart contracts**

O núcleo do dApp desenvolvido é composto por três contratos inteligentes, cada um com uma função específica, interligados para garantir a funcionalidade completa da aplicação. São eles: *workToken, betContract* e *distributedBet*.  
O contrato inteligente betContract gerencia todas as operações relacionadas às apostas na plataforma. Suas funcionalidades incluem distribuição de prêmios, cálculo de odd, participação em apostas, gerenciamento de status da aposta dentre outros. A fim de garantir a individualidade de cada aposta, uma instância deste contrato é criada para cada nova aposta realizada no sistema.  
A criação de novos contratos de apostas é gerenciada de forma descentralizada pelo contrato inteligente *distributedBet*, garantindo a transparência e a segurança em todas as operações da plataforma. Suas principais funcionalidade incluem criação de novas apostas, gerenciamento de atributos de apostas e finalização de apostas. O contrato *workToken* é responsável pelo gerenciamento dos tokens, chamados de Lulacoins, existentes nas redes e pelo gerenciamento das operações de transferências.

## 

# **Resultados e discussões**

## **Testes do smart contract (dlt)**

Para realização dos testes dos contratos dentro da blockchain foi utilizada uma rede privada do *hardhat*. Dentro dessa rede foram implementados testes unitários e  de integração.  
Os testes unitários foram realizados com base em callbacks das funções descritas nos contratos e asserção dos resultados. Os testes unitários serviram para validar as funções individuais dos contratos.  
Para as funções que criavam novos contratos, ou dependiam de funcionalidades de outros contratos, foram desenvolvidos testes de integração, que validam os resultados obtidos com o que deveria acontecer em cada etapa.  
Além disso, foram verificadas as emissões de eventos e registros do mesmos na blockchain, Para isso foi utilizado o terminal de debug e output da remix IDE, a IDE da ethereum, pelo terminal foi possível constatar que os eventos estavam sendo realizados e salvos na DLT.

## **Testes da interface**

Para realização dos testes da interface, solicitamos a alguns usuários que experimentassem e respondessem se era uma interface utilizavel ou se tinha algum problema de experiência. As respostas foram anônimas, porém mais de 50% das pessoas que responderam informaram que tiveram facilidade em utilizar a interface, as reclamações recebidas foram com relação a aparência, pois a mesma não possui muitas animações ou cores chamativas. Ao longo dos testes dos usuários, os bugs encontrados foram corrigidos, no entanto advertimos que ainda pode haver algum bug que não foi notado durante os testes.

# **Conclusão**

# O presente trabalho buscou implementar uma aplicação distribuída de apostas online utilizando a plataforma Ethereum. A solução desenvolvida associou a rede blockchain a contratos inteligentes, criando uma solução segura, transparente e escalável, que atende aos requisitos propostos.

O sistema de apostas oferece ao usuário a criação de apostas personalizadas, cálculo de odds dinâmicos, simulação em tempo real de apostas online e gerenciamento de recursos. A interface gráfica implementada permite a utilização das funcionalidades da plataforma de forma simples.  
Os resultados obtidos demonstram o potencial da tecnologia blockchain para transformar o mercado de apostas online e abrir caminho para novas oportunidades de negócios.

# **Referências**

HEDERA. What are distributed ledger technologies (DLTs)?. Hedera. \[s.d.\]. Disponível em: \<https://hedera.com/learning/distributed-ledger-technologies/what-are-distributed-ledger-technologies-dlts\> Acesso em: 12 dez. 2024  
RAUCHS, M.; GLIDDEN, A.; GORDON, B.;  PIETERS, G.; RECANATINI, M.; ROSTAND F.; VAGNEUR  K.; ZHANG, B. Distributed Ledger Technology Systems: A Conceptual Framework. Cambridge Center for Alternative Finance. Ago. 2018\. Disponível em: \<https://www.jbs.cam.ac.uk/wp-content/uploads/2020/08/2018-10-26-conceptualising-dlt-systems.pdf\> Acesso em: 12 dez. 2024  
LBANK EXCHANGE. What is Distributed Ledger Technology (DLT)?. Medium. 29 out. 2022\. Disponível em: \<https://medium.com/@lbank-exchange/what-is-distributed-ledger-technology-dlt-7a081e4fe774\> Acesso em: 12 dez. 2024  
CRIPTO CRUMB SNATCHERS. Blockchain vs. Distributed Ledger Technology: A Comprehensive Crypto Guide. Medium. 23 jul. 2023\. Disponível em: \<https://medium.com/coinmonks/blockchain-vs-distributed-ledger-technology-a-comprehensive-crypto-guide-ee21a4ec4ede\> Acesso em: 12 dez. 2024  
BANCO CENTRAL DO BRASIL. Distributed ledger technical research in Central Bank of Brazil: Positioning report. 31 ago. 2017\. Disponível em: \<https://www.bcb.gov.br/content/publicacoes/outras\_pub\_alfa/Distributed\_ledger\_technical\_research\_in\_Central\_Bank\_of\_Brazil.pdf\> Acesso em: 12 dez. 2024\.  
RAFT. The Raft Consensus Algorithm. Github. \[s.d.\] Disponível em: \<https://raft.github.io/\> Acesso em: 12 dez. 2024  
GEEKS FOR GEEKS. Consensus Algorithm  in Distributed System. Geeks for geeks. 15 jul. 2024\. Disponível em: \<https://www.geeksforgeeks.org/consensus-algorithms-in-distributed-system/\> Acesso em: 12 dez. 2024  
GLAZER, Phil. An Overview of Cryptocurrency Consensus Algorithms. 2018\. Disponível em: \<https://cs.brown.edu/courses/csci1800/sources/2018\_03\_14\_HackerNoon\_AnOverviewOfCryptocurrencyConsensusAlgorithms.pdf\> Acesso em: 12 dez. 2024  
RHIM, Hana. Fault and Failure in Distributed Systems. Baeldung. 02 fev. 2024\. Disponível em: \<https://www.baeldung.com/cs/distributed-systems-fault-failure\> Acesso em: 12 dez. 2024  
ETHEREUM.ORG. What is a smart contract?. 22 abr. 2024a. Disponível em: \<https://ethereum.org/en/developers/docs/smart-contracts/\> Acesso em 12\. dez. 2024  
IBM.What are smart contracts?. \[s.d.\]. Disponível em: \<https://www.ibm.com/topics/smart-contracts\> Acesso em: 12 dez. 2024  
ETHEREUM.ORG. Intro to Ethereum. 26 jun. 2024b. Disponível em: \<https://ethereum.org/en/developers/docs/intro-to-ethereum/\> Acesso em: 12 dez. 2024  
ETHEREUM.ORG. Intro to dapps. 2024\. Disponível em: \<[https://ethereum.org/en/developers/docs/dapps/](https://ethereum.org/en/developers/docs/dapps/)\>. Acesso em: 12 dez. 2024