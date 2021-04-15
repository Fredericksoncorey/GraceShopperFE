import {React, useEffect, useState} from 'react';
import { fetchProducts, getGenreList, searchProductsByArtist, searchProductsByGenre, searchProductsByTitle } from '../api'

const Home = ({loggedIn, currentUser, genreList}) => {
    const [allProducts, setAllProducts] = useState([]);
    const [artistSearch,setArtistSearch] = useState()
    const [genreSearch,setGenreSearch] = useState();
    const [titleSearch,setTitleSearch] = useState();
    const [searchFailed, setSearchFailed] = useState(false)
    const [searchResults, setSearchResults] = useState()
    const [selectedSearch, setSelectedSearch] = useState()
    const [showReview, setShowReview] = useState(false)
    const [showDescription, setShowDescription] = useState(false)
    
     
    const averageRating = ({reviews}) => {
        let averageRating = 0
        console.log(reviews)
        for (let i=0;i<reviews.length;i++){
            averageRating = averageRating + reviews[i].rating
        }
        averageRating = averageRating/reviews.length
        if(isNaN(averageRating)){
            return `This product has not been rated yet`
        }
        return `Rating: ${averageRating}/5`
    } 
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            setShowReview(false)
            if(artistSearch){
                setSearchResults(await searchProductsByArtist(artistSearch))
            }else if(genreSearch){
                setSearchResults(await searchProductsByGenre(genreSearch))
            }else if(titleSearch){
                setSearchResults(await searchProductsByTitle(titleSearch))
            }

        } catch (error) {
            throw error
        }finally{
           /*  console.log(searchResults) */
              
        }


    }
    
    useEffect(() => {console.log(selectedSearch)}, [selectedSearch]);

// eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
            if(!searchResults){
                return
            }else if(searchResults==false){
                setSearchFailed(true)

            }else{
            setSearchFailed(false)
            }
            
        }, [searchResults]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        const response = await fetchProducts()
        setAllProducts(response)
        console.log(allProducts)
     }, []);
           
     
     return (
        <div className="home">
        <div className="search">
            <form className="searchBar">
                <label>Search By...</label>
                <select
                    name="select"
                    value={selectedSearch}
                    onChange={(e) => {
                        console.log(genreList)
                        return setSelectedSearch(e.target.value)}}
                >
                <option value={false}>Select One</option>
                <option value="artist">Artist</option>
                <option value="genre">Genre</option>
                <option value="title">Album Title</option>
                </select> 
                <button onClick={()=>{
                    setShowReview(false)
                    setSearchResults(null)
                    setSelectedSearch(null)
                    setGenreSearch(null)
                    setTitleSearch(null)
                    setArtistSearch(null)
                }}>Reset</button> 
                
            </form>

            {selectedSearch==="artist" ? <form className="searchSelected" onSubmit={handleSubmit}>
                
            {/*  <label>Search By Artist:</label> */}
                <input
                name="artist"
                placeholder="Please Input Desired Artist"
                onChange={(e) => {
                    
                    setArtistSearch(e.target.value)}}
                />
                <button type="submit">Submit</button>   
            </form> : null }

            { selectedSearch==="genre" ? <form className="searchSelected" onSubmit={handleSubmit}>
                {/* <label>Search By Genre:</label> */}
                <select
                name="genre"
                value={genreSearch}
                onChange={(e) => {
                    setArtistSearch(null)
                    setTitleSearch(null)
                    return setGenreSearch(e.target.value)}}
                >
                <option value={false}>Select One</option>
                {genreList.map(genre=>
                <option value={genre}>{genre}</option>)} 
                </select> 
                <button type="submit">Submit</button> 
                
            </form> : null }

            {selectedSearch==="title" ? <form className="searchSelected" onSubmit={handleSubmit}>
                
                {/* <label>Search By Album:</label> */}
                <input
                name="title"
                placeholder="Please Input Desired Album"
                onChange={(e) => {
                    setGenreSearch(null)
                    setArtistSearch(null)
                    setTitleSearch(e.target.value)}}
                />
                <button type="submit">Submit</button>   
            </form> : null} 
            

        </div>

        
            {!searchResults ? allProducts?.map((product,key) => {
                
                return (
                    <div className="homeProductList" >
                        {product.imageLink===null ? 
                        <div><img alt="imageLink" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFRUSFRUYGBgaGhgYHBwaGBocGRwcGBgZGRgdGB4cIS4lHSMrIRwYJjgnKzAxNTU1GiQ7QDs2Py40NTEBDAwMDw8PHBISGDUrJSQ/NDM0ND8xPz80ND8xMTExPz80MT8/MTcxNzg0Pz8xNDE0MTY0NDU0NjE2NDE0NjExMf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAABAMFAgYHAQj/xABHEAACAQIBCAYGCQMDAwMFAAABAgADESEEBRIxQVFh8AYicYGRoQcTMkKxwVJicoKSosLR4RQjsqPi8YOz0kNEcxUWM1NU/8QAGgEBAQADAQEAAAAAAAAAAAAAAAEDBAUCBv/EACcRAQACAQMEAgICAwAAAAAAAAABAgMEETEFEiFRIkET0aGxMkJx/9oADAMBAAIRAxEAPwDs0IQgEIQgEIQgEISlz/0kyXIk08oqhLi6rrdrfRQdY9uobSIF1F8qylKal6jqijWzsFUdpJsJybOnpJyzKLrkNEUKZ1VaoDORhiq4qu3Y44ianlOb3rN6zKq1TKHxxdjYXN7KL9UcAQOEDq2dfSfm2j1RVau2q1FCwPYzaKnuM1zK/S3Va/8AT5A1tjVXt+VVt+aagmTomCKq9gA8Zg45/wCYF1X9JOdW1Lk1PsUk/mcyvqdO87E3/rEXgtKjbzQnzlY/Nv4EhfS4/nhVp/8Af2dh/wC9U8DSoW/7YjlD0o5zXWcmqfaUfodZrD6XH/U/mL1W3nuY/wDmnzhHRsk9MdZbevyMEbWR2XwV1IPZpd82bNnpXzdVsHapQOr+4l1/EhYAcTacMA2qMd6j4mk36Zh7Rt7R7mbvtouLd8D6oyHONKuunRqpUX6SOrDsup1xyfJuS1Gpvp0aj03HvU3YMN46ui6juM3rMHpXyyjYZQq5TTwGkLJUGr3lGiexlBO+B3iE1zo50wyTLhahV69rmk/VqDf1feA3qSOM2OAQhCAQhCAQhCAQhCAQhCAQhCASGtVVFZ3YKqgkliAABiSScABviueM7UclpNXruERdu0k6lUayx2ATjOfM9ZRnVrvpUcjBBWkDZnAODVCNd9mwbL+1A2DpF6SKlZmyfNi3sdFsodeoP/jU6zxYHbZSOtNRoZpXSatWdq1ZjdnqG+OG+/DeRstLOhRVFCIoVRsGGvfuvu1nbMiPLut8l+MioWHP8a/GQuOecIww5/jb2mROOecPCAq4i7iNuIs4gKVB2+f7iKuBw8F+bRuoOcPnFajDfbv/AGWAq4H1fCn/AOQkZBHsgjsFQDxRj8JI7j6Xif3SLuAdi/6Z+BUwI3IJtgTx0GbsswV/OYufdPg3lZKuPDqtMqhIwa4G5iwHhUDL+aYnAW1A/dU7zZtKmd+BEqPSNSnEj3SCSN1lazL2qx1Qv71+GlpHDhpAaS7rOCMNc8K+7bjo28wjHHbijT0n3r6sL6Rw2W0iNJd2i4I4wPFFmDKSrLZlK9VhbUwCnh7SHjadH6JelOrR0KWXXq0zYLWUXdRqu9sHAw1WYY30jhOdW2bsbWsB9YqPZ+2uHCSAa77Rc3xuN7aPtD664jG8D6jyDLadZFq0nV0YXDKbg87tkbnzT0Z6R5Rm9/WUDpUyQalFjdGGq4I1G2pxuFwRge99GekVDLqIrUW1WDIcHRvosPgdR2QLuEIQCEIQCEIQCEIQCV2ec60slovlFZtFEFzvJ2BRtJOAEbrVVRWdiFVQWYk2AAFySdgAnCOk2fjnTKNPEZJSJFJDcabbXYbSd2wWGstAxzlnCtnOsMpygaNFf/w0b3UKfeb6ROFzt+yAC+p5/b5mLI0mVuednDbIqYc/xuH1tsP+f5F9XaZiDzrx+Z8hMud+PzPHUIEbDnf+/aZGw5/n9o1ob+e3fMHEBF0i1UR+osTqrArawiVaWFcSvrQEasUqRqqYnUMCMVGX2WI7CR475mmVEbBxK9UntAFj3qZAxnkB+mwbAY/VsMfuE6JOHukHhJAdt9WF7nDgGOK/ZfDjK4CN0qp965wtf3rbjfBhwPlKGFFuFvu2J86Z4i6mTKvx+zY/obiOqZig1W7BbzC380OvZrkqD4G1scNtr6xvU6tYkHqr8d1jfbYe629dR8I3mjOVbIqy5VkzWI9tMdB0viGG0cNYOIkCr8uy2y52jcdmqSKvb87jX94bd4gfQPRXpHRy6gtekbH2XQnrI1sVbfvB2iXs+bsxZ5q5vyhcrpYobLWpg9V1O7cdqnYeBN/oTNecKeUUkyikwZKihlI3bQdxBuCNhBEqHYQhAIQhAIQlN0pz0mRZLVyprHQHVH0nbBF72IudgudkDn3pZ6RF2XNVFrXs9dhsXWtP4Me1RqJE1DJwFUKosALCVeSu7Fq1Ri1SoxdmOsliSL7r4m0dR+ed8KsEeTI/PO2V6PJ0eQPo3POzjtjKc87ojSeNI8BiRuJkGmDvfV/PPn2a4EFWJ1Y24/f+f584vUWBX1VilTh5fw0fqiIVhyf5UwFKpI1+f+54oyK2wEHcAbfgAHi8aa41eX+1LxaprscTrF8T3BtJvBRKhRslUi4NtWNwV3W128GY8Is+Tst7i4Gsi+F/pA4r3gSyY4k7RgTtAwNiS1x2Fl7IAW4W7rXJ+zo34aF/rQK1RJkWNNkwOrA9mGGu4sLdwFtqjXMFpkYESKypYdh1jYe2PIL4/wDN9lz9Lc22LokYpi0CVV5t4m3xElVeez5jYd09Vefn2798kVeed2yBiEvhr+Bv8j8ZtHow6RHJMo/oahPqK7Xpk6kqHZ2Ngv2tHeTNdC88+Mgy7JdNCB7Q6ynV1hq7LwPpeE1P0edIv67I0dj/AHqf9qrvLqBZrfWWx3XLDZNslQQhCATivpjzz63KaWQqepRHraltrsvVB4hDh/8ALOxZXlK00eq5sqKzsdyoCzHwBny/lGXtXqVcqf26rtUI12GlpBcdlyijgsBgPv43/V8lkyvv43+fyURFXtxI87Gw7buSfuyRH1W4W442XxOk3dIqwR+fj4apKtWVwq2F+y3no/NvCCVoF1TqxynVlHTrR2lVgWwqX5554zMHnnntMRp1IwtQAEkgAC5JwAA1kwJWHPPPEapVZwznSp3UtpN9FcSPtHUPjEcqzpVyhvUZMGAOthgzDeT7i87bS7zN0SpJZqtqj7j7A7F9773gJrZ9Vjwx8p8+vtlx4bZJ8NcTLMorm1CizDV1VZrdreyO+NU+i2XviUC/adB5KTOj0FAAAAAGoDADsEbpzj5er5N/hWI/75btdFX/AGmXK6/QrLgL+rVuCul/zESny3NeUUB/cp1EXipKY7zipncSJE4kp1jJE/KsT/H7WdDTbxMuEpWItcXtqK6xhsFxb7pWM0yDYjVja3HYLAWJ3WBO550XPPRLJ612Ueqf6SDqk/WXUe0WPGc/zjm2rkz6Dra+phijDbY7ew4jwnX02tx5/FZ2n00suC2Pnj2yRPl/ttbyt92x6sl9WCOfl3+drG4nmTkMLj99eG3X369RxsYyic884X1gzbYSy07SZUk/q+eedfCZKkDymsmVeed08VJKqwMQszAmQE9AgWPQHOn9HnJUJtSysCm24VAb0z26RK/9Q7p3WfNeeKRNMspIdCHUjWCuNxbhj3Cd+6M52GV5Lk+Ui39xAWA1Bx1XXuYMO6VFtCEIGj+lzOXqc21FBsazLRHYxLP4orDvnBg2iPs/FBpW49d1H3Z1H055VpPkOTXwJd2HaURT4F5yxX1MeDH81dgPBBAkBtgNYwHaD6tTw6xdu6ZK19Wo4A8DdFv2Irt3yDFRxUfmRQBbjp1D4TIriVHFR3laK9uCue+RWVWtq/Fbdf2R3Lo+cEqxN6ukxbeSR2bB4QFSBbUKlzbnnZ3x9KvI+Xl4rKfJGwLar7dwFrnz0v8Apxtan/A2a7gdlnH3FgW1OtzzzqiGW5Q+UOuT09V8dxI1lvqrzsi2U5UQLDWf+MPM9mjL/otkIRPWEdZ9XBdnjr8N0wanN+Kk2+/p7xU77bLrM+b0oIEXWcWbax3n5DZLamYpTMapmfNZLTaZtafMutSIiNoOUzG6ZiVMxymZqWZqmJHUkgmDTG9Fqkrc55ElZGput1PiDsKnYRLKpFnmfHaazExPl4tETG0uV5ZkbZLWNNsVOKtbBlOF/kR/EskXbzzztmx9Js2evosAOul3Xfca1+8MO226anmWvpLo7Vt+E6v28J9To9R+bHvPMcuPnxdlto4ng8qc886pkEkgWe2m2wsQs9AmUIHlp7CeXgBF8DN59CuXE5PlGSMSTQqkrf6FS9rfeSoe+aNeXnovyj1edKtO/VrUC1vrIy28tPxlR2mEIQOB+mTKNLOVvoZMq9htWf8AUJpDprUfWUdl6VL4BptPpQYnOmW8EpKOw0aXzYzXNHr/AHh512PyECNWuQ29ge41HcnwRZGuAHBQR2rSLX/FUmQXq/dH/Zc/qntZcH+8POivykVXwkuhPCkB6iLKuGAAJJ3WDn8r1B3SQFuJYdw0hcf50x+Mz0ppHR2Dq/8AeT4W8IazfZ7XnSf4lvGVEOT0/WVFQamcILfRBCg/hHlOh0wBYDADATRujNO9dPqhj+Uj5zeVnH6hbe0V9R/bd0seJk1TMbpmJUzHKZnJs3am6ZjdMxOmZLmzJa2V1qlKk4pUqOiKlTRDMzsukEphuqLKQSxv7QFtc84tPfPbtryt8lcde6ywWYtHMpzS9EAl/WKcNIqA4P1tHqkHHEAW1WN7xRphz4b4L9to8vePJGSO6papFqkbeLVJ5q9SUec9r0vU5ayDBWJI7HGmLdjYd06JUmidMV0copPvVfyuT852OmXmMvb7ho6uu9N/RyeXkHrOfCeGpz4md9zk+lDTizVJj6yA1pTzSkAfDnhDT57yIE+lGuitbQzrkL/Saon4kdR5tK3T5+7M83ORl+b2Gv8AqqS9zVUU+RMD6NhCEqPnf0mKf/quWcVpEdgoUfmDNf0Ot94H/Vb95t/paoaOdCf/ANmTo3h6xP0TViNZ4kj8SP8AvAWCYfdH/aYfKe1EwfjpHxNMxlaeocQO7Sdf1CeBLju+KW+KyKrfVw9XHBTmYpQPQtjfv86jT1aVsO7ypr+8ZSncDs+QX5NMxT/f4n4keEoU6OnRyhRvDD8pPym5iaTUPqqyPsBB7gbN+X4zdROP1Cu14t7j+m5pp+MwZpmN0zEqZjdMzlWblTlMyw6P5acmq1ToF6dYqzaJGkjqoTSsxAZWULexuCuo6WFdTjdMzziz3wX7q8vV8dcle2zYs5Z1WoAqA2uCScNWoASqaYUzJDMOfPfNebW5e8eOuOO2pd4s8aeLuJjq9SUqTQum7j19NdoQH8Tn/wAZv1Scv6UZVp5TUIx0SEX7uB/NpTsdMpNsu/qGlq7bU29mUrau74ofnPfWbOdTj5RAVNl8NQtuPUB8GpmZrW26ve47H/8AMd0+hc1M9bE9pnnrZWrWmYqyC0Sph4/FZmH1do/yb9onSf2e7zcn4LPVfDu+CFj/AJCA1p/D9EmzVjl+QAf/ANVI9wrIT5AxEtrHaP8ABP3lt0LT1mdMhXc7v+Baj/pgfRcIQlRx/wBNWTaNfIcotgwekx+yysoP4n8DNDWns7vIoflOv+mLN5q5vaoPaoVKdXDdco3cA+l92cmpdZQw94A+Iv8AEQI9D9+8gH4rMgm3v8DpDyJk4TnzHzmSpzzwMilfVTJaUaFOSLTgQpT557/GSrTkypJFSBV51yTTQkDFet3e8PD4Sw6PZb6ykFJ6yWU8R7p8MO0GTqOeefCa/lKNktUVUHUY6tmPtId28dnCa+pxflptHMcMmK/bbf6bnTMapmVuQ5StRQ6m4PiDtB3GWNMz57JWYnaXTrMT5g5TMbpmJ0zGqZmpdmqdpmSmQUzJ5hlkRVIs8aqRLLK6orOzBVUXJOoCe6RMztDzZT9Ic4jJ6Lv7x6qjex1dwxJ4Ccrpglr39nG5x6xBseNgGb7suM/Z0bK6twCEXBF3A6yfrNh2WA2XKoo6IsO2+vHA3tt1Kbbgo9+fVaDTThx+eZ5/Tj6jL328cQiJ2HAY3AOoWYEYbhpjtpLvkeVVCqm9rnDvJOlr4+t7nWTMluFu+1u/G2iDx9Wfpyty44hQLBdm42At3AKv3b7ZvNditSSCpFAZPkvtX16PW7SPZHexUd8irMk4qNeK9tgtIfmLnumYcHsJ8mew/IhiouMBiRq4leopHa7Ocfoz3XgpwPVB4H+0v5Q7d8qGlq6mPBu3BqhHms3H0RZJp5yLkYUaDG+5m0Ut29Z/AzRg4PYfIOdLyRB+Kdd9BuQEUsqyptdSoEG61MFmI7Wcj7sDqkIQgKZzyNa9GrQf2aiMjdjqVNuOM+cs3UmTTyd8Ho1HpsOKsQe7SBn0xOKek3Nf9Nl6ZUBanlK6LbhVUBTfdcaB49Y7IFCEmYSZhZmFkVGqSVUmQWZIIAqwK88865nPGMDAmQ5QispRhcHWOdUzdou7wKZWqZK+mh0kOsHURuYbDxH8Tas058pVrLfQf6LGxP2Tqbux4SirtfDnnmxlPlOTDWtuz5bu7Xwmrn0tM3mfE+2XHmtTjh1OnG6ZnJslz9lFEhRUYAe640h+bEDsIlvQ6dVx7SUm7NJf1GcnJ0zLH+O0t2mrp97w6bTMYE5g3T7KLdWlSB46beQYRDKukuXV+qapRTsQBPMdbzmKnSc9p+W0PVtbjiPG8ujZ7z/QyYH1jXfYi4ud2Huji1hOb53zxXy1sepTB6qjFRxY+83w4Y3VoZvF7ubnWe07/wCbSxVABYCw55/edbS9Px4PPM+/1H008uptk8cR6K08nCiw5/f59l546c379fib9+xY0w5+PPjukb4Y87+fE7BN9rka3VF9uzDbhs2WsPBRsMq3py0qi8XdIFW9OM5NTKgW9okHvNxTH+TdiiTLRucRgNdtZ3AcTqmbrrvxvbcbBivbgi98CJRqC/V0b7LgimTuw03PaJ7r1YA4A7gy6K37KYZvvT1hr0vrXts1aej3aKDtM8ca9L62lbuNTR3e7THfKjGq/VLWthgN2kAQB2Iqr96fTPQ3NH9JkWT5MRZlQFvtsS7/AJmbuAnEPRzmU5XnCkGF0on19TdpKQQO99FbbVQz6MgEIQgE13pxmAZdkdTJ8NP26ROyol9HHYDipO5jNihA+dM05QXWzgh0JR1IswZcDcHUcPEEbI+Bzz4y59J2YjkuUDOVJf7VUha4UanOp8NjYfeH15TIwIBBuCLgjaNYt8RIr23PO+EJ4TAz0pG7zFmkLvAKjxV6k9qvEazwMqrft/H8flilR9Z3a+HAm4t2Fh9mYPlBHHnnA4cJEcpU2xt27OwgHy0IAxsMfZ8Fse0ovk0wWkv0Aw3hb/4U7ecyU3xGN8CVxPeUDN4vBmt7Vj9q366l5USog+hbtBH+SRqkd2rha35bjyitJwfZt3aP6HjK8dm+/wCsfBoUyh55/cSXnnkd8XWoN/PPEzMPIJGNpA+MznhEBd1kRS+AjRW8NC3Px4fGAt6sDVf544X7TqHjI2Xu+AthccFGA3sdsaZe354/qPkJgw7Plht7B5nfAUKbsN3AgXF/si7HiRIXsovqta1+FyoPiXPEiOMmy3Cx8bH/ACbwwmy+jfoz/W5UKrrfJ8nYM1xhUqHrKvHEBm19UKD7QlHSvRZ0cOR5GHdbVq9qj31hbf20O3BTcg6i7Td4QhBCEIBCEICmX5Elem9GqoZHUqwO0EWPYeI1ThGcs2Pm3KDkdUlqT3ahUOplJ9knVpAmxGwkbGE+gpSdKej1HLqDZPVHFWA6yNbBl+BG0EiBx4mYMYtXo1sjrHIsrFmHsP7tRdSkE67+Ow465WaRXjtIHaZO0gduedUCGsYjVeNu3l5fNfhFKwB17ewHu91u4gwEarRSoY3WpG9hid2pvwnHwvEqmBscDu2wIWEmp1WGpmHYSJFMlgNrVY62Y9pMYpRNI1TMB2mYyhidMxtFO3Dt/bXAkEyC8/tPVXn+P3mXPJ+QgY25/ff2TEjnXj8z8JIeednZMSOedQ8zAiK8/HH4mYMP3/Y2+A75Mw5+F/kJFTpVK1VcmoKXrObKo93ezHULDEk4KIBm3NtXK66ZHQF3f2m1qiDFmY7ht3kgDEifQ/R7M9LI6CZNSHVQYk+0zHFnbeScfIYASr6EdEqeb6OgOvWexq1Le0dirfEKLm3eTrm0yoIQhAIQhAIQhAIQhAouk/Rqhl9E0ay4i5VxbTRt6n4jUZxPPGbcozfU9RlQLITanXAJRxx3EbQcRxHWn0TEc55upV6bUa1NaiMLFSMOBG0EbCMRsgfP7PfVjfvv2b4u7c/86+wzaOk/o6yjJC1XI9LKKGs0zjVQcPpjivWx1HEzTaeVq+o2bUVPtYbMcG+MKydvLtw+a+Yi7t3X7AD+hvIyRz5duH6l8xF3bbv23AB4FhdT94CQR1D7pw3A2H5Xw/C0ic2wOA2BiQPw1Qy+DTNzYbgfuqf8kPlMACBcXA2lQyjxpll8pRh6kH3AeIRrf6bkDwnnqF2gjvcfGmZ6Sp+j/pNfx0WkiJbUrdytb8tWEFOiuwE97/KmIylO3u2+63mWIEiCnard6v8AqqSRLD6P+mPmxkU1TOweW3uQfOTJu8v4Fz4mQLiNpH3iPPRWSodnwx8lsPEwJl3c+Aw8Znfn+f2kSnnA/wC0SQHbz4/tA9553Tzn/j9zI8oylEF3NuG3uHzMvujXQjK8vs9QNk2TGxuw/uVB9VTjiPebDG4DSijzfklfK6oybJE03PtPqRFOtmbYOOs6gCcJ23oZ0Oo5vpkL16zj+5VI6zbbL9Fb7Nus3lpmLMVDI6Qo5OgRdZOtmO1nbWx7ewWGEtYQQhCAQhCAQhCAQhCAQhCAQhCATU+k/QTI8uuzp6uqf/Vp2Vyfri1n1D2he2oibZCBwHPvo8zhktyijKqY1NTB9YAN6X0geClppprjSIN1YXBDXVgdRBKi9/tLPrCVGeOjuS5WLZRQSobWDEWcD6rrZl7iIHzLvI7yt/8AKlh+JZGLE3FieARm7bqVbynZs6ehzJnJbJ61SidYDAVFHZfRbxYzV84eiXOC30KlCsNmkxD+DoQPxQNDdiPaJHaXA8HRgPGYAr9TxofNRNjrdA86U/8A2TfcdTfup1PlFG6P5epsciyu/wBVK5HiAR5wKtCv1fGj8lMZpt9E+Ba35EEbXMWXk2GQ5Z3064HiVEfo9DM6PqyF/vuq/wCbiBVjeRjxAH+ZJ8pKp26xvNyPFrDym0ZD6L85vbSbJ6A243YdyKQfxTY83eh6lfSynKqlXbooBTXsJJYntBEDmNXLkTW1zuHWPZuE2DM3RDOOWWK0v6emf/UrXViPqqRpnDVgAd4nZMy9E8iySxoZNTRh7xGlUx19drt3XtL2BpHRn0cZJkhFRwcorCx06oGipG1ExC4i4J0mG+bvCEAhCEAhCEAhCEAhCEAhCEAhCEAhCEAhCEAhCEAhCEAhCEAhCEAhCEAhCEAhCEAhCEAhCEAhCEAhCED/2Q=="/></div>:
                        <div><img alt="imageLink" src={product.imageLink}/></div>}
                        <div className="homeInfo">
                            <div className="info">
                                 <h3>Title: {product.title}</h3>
                                <p>{averageRating(product)}</p>
                                <p>{product.artist}</p>
                                <p>{product.genre}</p>
                                
                                {showDescription!==key ? <button onClick ={()=>{
                                        setShowReview(null)
                                        setShowDescription(key)
                                    }}>Show Description</button>: null}
                                
                                <p>{product.releaseDate.slice(0,10)}</p>
                                <p>{product.price}</p>
                                <p>{product.quantity ? 'In Stock' : "Out of stock"}</p>
                                
                                {product.reviews.length && showReview !== key ? 
                                    <button onClick ={()=>{
                                        setShowDescription(null)
                                        setShowReview(key)
                                    }}>Show Reviews</button>: null}
                                    

                            </div>
                            <div className="feature">
                            
                            {showDescription===key ?
                                <p>{product.description}</p>
                            :null}
                            
                            {showReview===key ? 
                                product.reviews.map(review => { 
                                    return(<>
                                        <u>{`${review.rating}/5 by ${review.byUser}`}</u>
                                        <p>{review.review}</p>
                                    </>)
                                }
                                )
                            :null}
                             
                            </div>
                        
                    </div>
                </div>)
            })
            
            :  searchResults?.map((product,key) => {
                return (
                    <div className="homeProductList" >
                        <div><img alt="imageLink" src={product.imageLink}/></div>
                        <div className="homeInfo">
                            <div className="info">
                                 <h3>Title: {product.title}</h3>
                                <p>{averageRating(product)}</p>
                                <p>{product.artist}</p>
                                <p>{product.genre}</p>
                                <p>{product.description}</p>
                                <p>{product.releaseDate.slice(0,10)}</p>
                                <p>{product.price}</p>
                                <p>{product.quantity ? 'In Stock' : "Out of stock"}</p>
                                
                            </div>
                            <div className="reviews">
                                {product.reviews.length   ? <button onClick ={()=>{
                                    setShowReview(key)
                                    }}>Show Reviews</button>: null}
                                {product.reviews ? product.reviews.map(review => { 
                                    return(<>
                                        
                                            {/* //------I was here!!! */}
                                            {showReview===key ? 
                                                <div classname='review'>
                                                    <b>{`${review.rating}/5`}</b>
                                                    <p>{review.review}</p> <p>by {review.byUser}</p>
                                                </div>
                                            :null
                                            }
                                        </>)}): null}
                            
                            
                        </div>
                        
                    </div>
                </div>)
            })
                
            }

            {searchFailed ? 
                
                <h3>Nothing came back, something went wrong with the search.</h3>
            : null}
        
    </div> )          

         

}



export default Home;