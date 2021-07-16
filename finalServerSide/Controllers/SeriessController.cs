using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Ex2.Models;
using Ex2.Models.DAL;

namespace Ex2.Controllers
{
    public class SeriessController : ApiController
    {
      

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody] Series series)
        {
            series.Insert();
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
 /*     * The most viewed series on our site for display on the Home page
        * input - none
        * Output - a sorted list of the most viewed series on the site  */
        public HttpResponseMessage Get()//List<Series>
        {
            Series s = new Series();
            List<Series> seriesList= s.Get();
            if (seriesList != null)
            {
                return Request.CreateResponse<List<Series>>(HttpStatusCode.OK, seriesList);
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "most viewed series on our site not exists");
            }
        }
    }
}
