using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Ex2.Models;

namespace Ex2.Controllers
{
    public class EpisodesController : ApiController
    {
        // GET api/<controller>/5
        public List<Episode> Get(string seriesName, int userId)
        {
            Episode e = new Episode();
            List<Episode> Elist = e.Get(seriesName, userId);
            return Elist;
        }

        // POST api/<controller>
        public int Post([FromBody]Episode e)
        {
            e.Insert();
            return 1;
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
        /*     * The most viewed episode on our site for display on the Home page
               * input - none
               * Output - a sorted list of the most episode series on the site  */
        public HttpResponseMessage Get()//List<Episode>
        {
            Episode s = new Episode();
            List<Episode> episodesList= s.Get();
            if (episodesList != null)
            {
                return Request.CreateResponse<List<Episode>>(HttpStatusCode.OK, episodesList);
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "most viewed series on our site not exists");
            }
        }
    }
}