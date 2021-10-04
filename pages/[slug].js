import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
 
import axios from 'axios'
import { useEffect, useState} from 'react'
import { useRouter } from 'next/dist/client/router' 

export default function Home( ) {

  const [HTMLData, setHTMLData] = useState("")
  const router = useRouter()

  useEffect(()=>{
    getData()
  },[router])


  async function getData(){
    const {slug} = router.query
    const html = await axios.get(`https://apphjbs.pt/orcamentos/view_hora.php?id=${slug}`)
    if(html ==  "Não Encontrado") {
      html = await axios.get(`https://apphjbs.pt/orcamentos/view_fixo.php?id=${slug}`)
    }
    setHTMLData(html.data)
  }
  return (
    <Layout home>
      <Head>
        <title>HJBS Transportes e Mudanças</title>
      </Head> 
      {HTMLData && HTMLData != "Não Encontrado"  ? <div dangerouslySetInnerHTML={{__html:HTMLData}}/> : 
      "Por favor aguarde ..."} 
        
    </Layout>
  )
}

 
