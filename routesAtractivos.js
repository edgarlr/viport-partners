const express = require('express');
const router = express.Router();
//Modelos
const User = require('./models/user').User;
const Lugar = require('./models/atractivos/lugar');
const Mpf = require('./models/atractivos/mpf');
const Consejo = require('./models/atractivos/consejo');
const Consejo_lugar = require('./models/atractivos/consejo-lugar');
const Sabiasque = require('./models/atractivos/sabiasque');
const Experiencia = require('./models/atractivos/experiencia');
//Finders
const lugar_finder_middleware = require('./middlewares/finder_atractivos/find_lugar');
const mpf_finder_middleware = require('./middlewares/finder_atractivos/find_mpf');
const consejo_finder_middleware = require('./middlewares/finder_atractivos/find_consejo');
const experiencia_finder_middleware = require('./middlewares/finder_atractivos/find_experiencia');
const sabiasque_finder_middleware = require('./middlewares/finder_atractivos/find_sabiasque');

/*Lugar*/
  //Nuevo
router.get("/nuevo-lugar", function (req, res) {
  res.render("app/destinos/nuevo/lugar", {destinos: res.locals.destinos, pageName: "Nuevo Lugar"});
})

router.all("/lugares/:lugar*", lugar_finder_middleware);

  //Editar
router.get("/lugares/:lugar/editar", function (req, res) {
  res.render("app/destinos/edit/lugar", {pageName:"Editar Lugar"});
})

  //REST
router.route("/lugares/:lugar")
  .get(function (req, res) {
    res.render("app/destinos/mostrar/lugar");
  })
  .put(function (req, res) {
    //variables iteradoras
    let telefono_lugar = [];
    for (var i = 0; i < req.fields.iterador_telefono; i++) {
      let tel_object_property = 'telefono_'+i;
      telefono_lugar.push(req.fields[tel_object_property]);
      console.log(req.fields[tel_object_property]);
    };

    let website_lugar = [];
    for (var i = 0; i < req.fields.iterador_web; i++) {
      let web_object_property = 'website_'+i;
      website_lugar.push(req.fields[web_object_property]);
      console.log(req.fields[web_object_property]);
    };

    Lugar.findOneAndUpdate(
      {
        _id: res.locals.lugar._id,
      },
      {
        title: req.fields.title,
        destino: req.fields.destino,
        description: req.fields.description,
        tel: telefono_lugar,
        website: website_lugar,
        adress: req.fields.adress,
        horario:{
          lunes:{
            apertura: req.fields.lunes_apertura,
            cierre: req.fields.lunes_cierre,
            precio: req.fields.lunes_precio
          },
          martes:{
            apertura: req.fields.martes_apertura,
            cierre: req.fields.martes_cierre,
            precio: req.fields.martes_precio
          },
          miercoles:{
            apertura: req.fields.miercoles_apertura,
            cierre: req.fields.miercoles_cierre,
            precio: req.fields.miercoles_precio
          },
          jueves:{
            apertura: req.fields.jueves_apertura,
            cierre: req.fields.jueves_cierre,
            precio: req.fields.jueves_precio
          },
          viernes:{
            apertura: req.fields.viernes_apertura,
            cierre: req.fields.viernes_cierre,
            precio: req.fields.viernes_precio
          },
          sabado:{
            apertura: req.fields.sabado_apertura,
            cierre: req.fields.sabado_cierre,
            precio: req.fields.sabado_precio
          },
          domingo:{
            apertura: req.fields.domingo_apertura,
            cierre: req.fields.domingo_cierre,
            precio: req.fields.domingo_precio
          }
        },
        precio:{
          menores: req.fields.menores_precio,
          inapam: req.fields.inapam_precio,
          discapacitados: req.fields.discapacitados_precio,
          pensionados: req.fields.pensionados_precio,
          estudiantes: req.fields.estudiantes_precio
        },
        info:{
          petfriendly: req.fields.checkbox_petfriendly,
          estacionamiento: req.fields.checkbox_estacionamiento,
          souvenirs: req.fields.checkbox_souvenirs,
          paqueteria: req.fields.checkbox_paqueteria,
          banos: req.fields.checkbox_banos,
          discapacitados: req.fields.checkbox_discapacitados,
          fumadores: req.fields.checkbox_fumadores,
          touroguia: req.fields.checkbox_touroguia,
          nochesdemuseos:  req.fields.checkbox_nochesmuseos,
          wifi: req.fields.checkbox_wifi,
          parquimetro: req.fields.checkbox_parquimetro
        }
      },
      { runValidators: true, context: "query"},
      function (err) {
        if (err) {
          console.log(err);
          res.render("/home/atractivos/lugares/"+res.locals.lugar._id)
        }
        res.redirect("/home/tablero/"+ req.fields.destino_hidden);
      }
    )
  })
  .delete(function (req, res) {
    Lugar.findById(req.params.lugar)
    .populate('destino')
    .exec(function (err, lugar) {
      if (!err) {
        let lugar_destino = lugar.destino.clave
        lugar.remove();
        res.redirect("/home/tablero/"+lugar_destino);
      }else {
        console.log(err);
        res.redirect("/home/atractivos/lugares/"+req.params.lugar);
      }
    })
  });

  //creador
router.post("/lugares", function (req, res) {
  var telefono_lugar = [];
  for (var i = 1; i <= req.fields.iterador_telefono; i++) {
    let tel_object_property = 'telefono_'+i;
    telefono_lugar.push(req.fields[tel_object_property]);
  }

  var website_lugar = [];
  for (var i = 1; i <= req.fields.iterador_web; i++) {
    let web_object_property = 'website_'+i;
    website_lugar.push(req.fields[web_object_property]);
  }

  let data = {
    type: "Lugar",
    library: "lugares",
    title: req.fields.title,
    destino: req.fields.destino,
    description: req.fields.description,
    tel: telefono_lugar,
    website: website_lugar,
    adress: req.fields.adress,
    horario:{
      lunes:{
        apertura: req.fields.lunes_apertura,
        cierre: req.fields.lunes_cierre,
        precio: req.fields.lunes_precio
      },
      martes:{
        apertura: req.fields.martes_apertura,
        cierre: req.fields.martes_cierre,
        precio: req.fields.martes_precio
      },
      miercoles:{
        apertura: req.fields.miercoles_apertura,
        cierre: req.fields.miercoles_cierre,
        precio: req.fields.miercoles_precio
      },
      jueves:{
        apertura: req.fields.jueves_apertura,
        cierre: req.fields.jueves_cierre,
        precio: req.fields.jueves_precio
      },
      viernes:{
        apertura: req.fields.viernes_apertura,
        cierre: req.fields.viernes_cierre,
        precio: req.fields.viernes_precio
      },
      sabado:{
        apertura: req.fields.sabado_apertura,
        cierre: req.fields.sabado_cierre,
        precio: req.fields.sabado_precio
      },
      domingo:{
        apertura: req.fields.domingo_apertura,
        cierre: req.fields.domingo_cierre,
        precio: req.fields.domingo_precio
      }
    },
    precio:{
      menores: req.fields.menores_precio,
      inapam: req.fields.inapam_precio,
      discapacitados: req.fields.discapacitados_precio,
      pensionados: req.fields.pensionados_precio,
      estudiantes: req.fields.estudiantes_precio
    },
    info:{
      petfriendly: req.fields.checkbox_petfriendly,
      estacionamiento: req.fields.checkbox_estacionamiento,
      souvenirs: req.fields.checkbox_souvenirs,
      paqueteria: req.fields.checkbox_paqueteria,
      banos: req.fields.checkbox_banos,
      discapacitados: req.fields.checkbox_discapacitados,
      fumadores: req.fields.checkbox_fumadores,
      touroguia: req.fields.checkbox_touroguia,
      nochesdemuseos:  req.fields.checkbox_nochesmuseos,
      wifi: req.fields.checkbox_wifi,
      parquimetro: req.fields.checkbox_parquimetro
    },
    creator: res.locals.user._id
  };

  var lugar = new Lugar(data);

  lugar.save(function (err) {
    if (!err) {
      res.redirect("/home/atractivos/lugares/"+lugar._id)
    }else {
      res.render(err)
    }
  })
});

  //Monumento, Parque, etc.
router.get("/nuevo-MPF", function (req, res) {
  res.render("app/destinos/nuevo/MPF", {destinos: res.locals.destinos, pageName: "Nuevo monumento, fuente, etc."});
})

router.all("/mpf/:atractivo*", mpf_finder_middleware);

  //Editar
router.get("/mpf/:atractivo/editar", function (req, res) {
  res.render("app/destinos/edit/mpf", {pageName:"Editar Monumento, Parque, Fuente, etc."});
})

  //REST
router.route("/mpf/:atractivo")
  .get(function (req, res) {
    res.render("app/destinos/mostrar/mpf");
  })
  .put(function (req, res) {
    Mpf.findOneAndUpdate(
      {
      _id: res.locals.mpf._id
      },
      {
        title: req.fields.title,
        destino: req.fields.destino,
        type: req.fields.type,
        description: req.fields.description,
        adress: req.fields.adress
      },
      { runValidators: true, context:"query"},
      function (err) {
        if (err) {
          console.log(err);
          res.render("/home/atractivos/mpf/"+res.locals.mpf._id)
        }
        res.redirect("/home/tablero/"+req.fields.destino_hidden);
      }
    )
  })
  .delete(function (req, res) {
    Mpf.findById(req.params.atractivo)
    .populate('destino')
    .exec(function (err, mpf) {
      if (!err) {
        let mpf_destino = mpf.destino.clave
        mpf.remove();
        res.redirect("/home/tablero/"+mpf_destino);
      }else {
        console.log(err);
        res.redirect("home/atractivos/mpf/"+req.params.atractivo);
      }
    })
  });

  //creador
router.post("/mpf", function (req, res) {
  let data = {
    library: "mpf",
    title: req.fields.title,
    destino: req.fields.destino,
    type: req.fields.type,
    description: req.fields.description,
    adress: req.fields.adress,
    creator: res.locals.user._id
  }
  var mpf = new Mpf(data);

  mpf.save(function (err) {
    if (!err) {
      console.log(mpf);
      res.redirect("/home/atractivos/mpf/"+mpf._id)
    }else {
      res.render(err)
    }
  })
});

  //Ruta
router.get("/nuevo-ruta", function (req, res) {
  res.render("app/destinos/nuevo/ruta", {destinos: res.locals.destinos, pageName: "Nueva Ruta"});
})

/*Consejo*/
  //Nuevo
router.get("/nuevo-consejo", function (req, res) {
  console.log(res.locals.destinos);
  res.render("app/destinos/nuevo/consejo", {destinos: res.locals.destinos, pageName: "Nuevo Consejo"});
})

router.all("/consejos/:consejo*", consejo_finder_middleware);

  //Editar
router.get("/consejos/:consejo/editar", function (req, res) {
  res.render("app/destinos/edit/consejo", {pageName:"Editar Consejo"});
})

  //REST
router.route("/consejos/:consejo")
  .get(function (req, res) {
    res.render("app/destinos/mostrar/consejo");
  })
  .put(function (req, res) {
    res.locals.consejo.title = req.fields.title;
    res.locals.consejo.destino = req.fields.destino;

    res.locals.consejo.save(function (err) {
      if(!err) {res.redirect("app/destinos/mostrar/consejo");}
      else {
        res.redirect("/home/atractivos/consejos/"+req.params.consejo+"/editar");
      }
    })
  })
  .delete(function (req, res) {
    Consejo.findOneAndRemove({_id: req.params.consejo}, function (err) {
      if (!err) {
        res.redirect("/home/tablero");
      }else {
        console.log(err);
        res.redirect("/home/atractivos/consejos/"+req.params.consejo);
      }
    })
  });

  //creador
router.post("/consejos", function (req, res) {
  let data = {
    type: "Consejo",
    library: "consejos",
    title: req.fields.title,
    destino: req.fields.destino,
    creator: res.locals.user._id
  };

  var consejo = new Consejo(data);

  consejo.save(function (err) {
    if (!err) {
      res.redirect("/home/atractivos/consejos/"+consejo._id)
    }else {
      res.render(err)
    }
  })
});

/*Experiencia*/
  //Nuevo
router.get("/nuevo-experiencia", function (req, res) {
  res.render("app/destinos/nuevo/experiencia", {destinos: res.locals.destinos, pageName: "Nueva Experiencia"});
})

router.all("/experiencias/:experiencia*", experiencia_finder_middleware);

  //Editar
router.get("/experiencias/:experiencia/editar", function (req, res) {
  Consejo_lugar.find({atractivo: req.params.experiencia}, function (err, consejos) {
    if (!err) {
      console.log(consejos);
      res.render("app/destinos/edit/experiencia", {pageName:"Editar Experiencia", consejos: consejos});
    }else {
      console.log(err);
    }
  })
})

  //REST
router.route("/experiencias/:experiencia")
  .get(function (req, res) {
    Consejo_lugar.find({atractivo:req.params.experiencia}, function (err, consejos) {
      if(!err){
        res.render("app/destinos/mostrar/experiencia", { consejos: consejos});
      }else {
        console.log(err);
      }
    })
  })
  .put(function (req, res) {
    Experiencia.findOneAndUpdate(
      {
        _id: res.locals.experiencia._id,
      },
      {
        title: req.fields.title,
        destino: req.fields.destino,
        description: req.fields.description,
        adress: req.fields.adress,
        horario:{
          lunes:{
            apertura: req.fields.lunes_apertura,
            cierre: req.fields.lunes_cierre,
            precio: req.fields.lunes_precio
          },
          martes:{
            apertura: req.fields.martes_apertura,
            cierre: req.fields.martes_cierre,
            precio: req.fields.martes_precio
          },
          miercoles:{
            apertura: req.fields.miercoles_apertura,
            cierre: req.fields.miercoles_cierre,
            precio: req.fields.miercoles_precio
          },
          jueves:{
            apertura: req.fields.jueves_apertura,
            cierre: req.fields.jueves_cierre,
            precio: req.fields.jueves_precio
          },
          viernes:{
            apertura: req.fields.viernes_apertura,
            cierre: req.fields.viernes_cierre,
            precio: req.fields.viernes_precio
          },
          sabado:{
            apertura: req.fields.sabado_apertura,
            cierre: req.fields.sabado_cierre,
            precio: req.fields.sabado_precio
          },
          domingo:{
            apertura: req.fields.domingo_apertura,
            cierre: req.fields.domingo_cierre,
            precio: req.fields.domingo_precio
          }
        },
        precio:{
          menores: req.fields.menores_precio,
          inapam: req.fields.inapam_precio,
          discapacitados: req.fields.discapacitados_precio,
          pensionados: req.fields.pensionados_precio,
          estudiantes: req.fields.estudiantes_precio
        }
      },
      { runValidators: true, context: "query"},
      function (err) {
        if (err) {
          console.log(err);
          res.render("/home/atractivos/experiencias/"+res.locals.experiencia._id)
        }
        res.redirect("/home/tablero");
      }
    )
  })
  .delete(function (req, res) {
    Experiencia.findById(req.params.experiencia)
    .populate('destino')
    .exec(function (err, experiencia) {
      if (!err) {
        var experiencia_destino = experiencia.destino.clave
        //Eliminar los consejos de la experiencia
        Consejo_lugar.find({atractivo: req.params.experiencia}, function (err, consejos) {
          if (err) { console.log(err); }
          for (var i = 0; i < consejos.length; i++) {
            consejos[i].remove()
          }
        });
        experiencia.remove();
        res.redirect("/home/tablero/"+experiencia_destino);
      }else {
        console.log(err);
        res.redirect("/home/atractivos/experiencias/"+req.params.experiencia);
      }
    })

  });

  //creador
router.post("/experiencias", function (req, res) {
  let data = {
    type: "Experiencia",
    library: "experiencias",
    title: req.fields.title,
    destino: req.fields.destino,
    description: req.fields.description,
    adress: req.fields.adress,
    horario:{
      lunes:{
        apertura: req.fields.lunes_apertura,
        cierre: req.fields.lunes_cierre,
        precio: req.fields.lunes_precio
      },
      martes:{
        apertura: req.fields.martes_apertura,
        cierre: req.fields.martes_cierre,
        precio: req.fields.martes_precio
      },
      miercoles:{
        apertura: req.fields.miercoles_apertura,
        cierre: req.fields.miercoles_cierre,
        precio: req.fields.miercoles_precio
      },
      jueves:{
        apertura: req.fields.jueves_apertura,
        cierre: req.fields.jueves_cierre,
        precio: req.fields.jueves_precio
      },
      viernes:{
        apertura: req.fields.viernes_apertura,
        cierre: req.fields.viernes_cierre,
        precio: req.fields.viernes_precio
      },
      sabado:{
        apertura: req.fields.sabado_apertura,
        cierre: req.fields.sabado_cierre,
        precio: req.fields.sabado_precio
      },
      domingo:{
        apertura: req.fields.domingo_apertura,
        cierre: req.fields.domingo_cierre,
        precio: req.fields.domingo_precio
      }
    },
    precio:{
      menores: req.fields.menores_precio,
      inapam: req.fields.inapam_precio,
      discapacitados: req.fields.discapacitados_precio,
      pensionados: req.fields.pensionados_precio,
      estudiantes: req.fields.estudiantes_precio
    },
    creator: res.locals.user._id
  };

  var experiencia = new Experiencia(data);

  experiencia.save(function (err) {
    if (!err) {
      res.redirect("/home/atractivos/experiencias/"+experiencia._id)
    }else {
      res.render(err)
    }
  });

  //iterar los consejos.
  let consejos_number = req.fields.iterador_consejos;

  for (var i = 0; i < consejos_number; i++) {
    let iterador_title = 'title_consejo_'+(i+1);

    let dataConsejo = {
      title: req.fields[iterador_title],
      atractivo: experiencia._id
    };

    let consejo = new Consejo_lugar(dataConsejo);

    consejo.save(function (err) {
      if (!err) {
        console.log("consejo "+(i+1)+" guardado con éxito!");
        console.log(consejo);
      }else {
        res.render(err);
      }
    })
  }
});

  /*Sabías Que*/
//Nuevo
router.get("/nuevo-sabiasque", function (req, res) {
  res.render("app/destinos/nuevo/sabiasque", {destinos: res.locals.destinos, pageName: "Nuevo Sabías Que"});
})

router.all("/sabiasque/:sabiasque*", sabiasque_finder_middleware)

//Editar
router.get("/sabiasque/:sabiasque/editar", function (req, res) {
  res.render("app/destinos/edit/sabiasque", {pageName:"Editar Sabías que"});
})

//REST
router.route("/sabiasque/:sabiasque")
.get(function (req, res) {
  res.render("app/destinos/mostrar/sabiasque");
})
.put(function (req, res) {
  res.locals.sabiasque.title = req.fields.title;
  res.locals.sabiasque.destino = req.fields.destino;
  res.locals.sabiasque.description = req.fields.description;

  res.locals.sabiasque.save(function (err) {
    if(!err){res.redirect("app/destinos/mostrar/sabiasque"); }
    else {
      res.redirect("/home/atractivos/sabiasque/"+req.params.sabiasque+"/editar");
    }
  })
})
.delete(function (req, res) {
  Sabiasque.findOneAndRemove({_id: req.params.sabiasque}, function (err) {
    if (!err) {
      res.redirect("/home/tablero")
    }else {
      console.log(err);
      res.redirect("/home/atractivos/sabiasque/"+req.params.sabiasque);
    }
  })
});

//creador
router.post("/sabiasque", function (req, res) {
let data = {
  type: "Sabías que",
  library: "sabiasque",
  title: req.fields.title,
  destino: req.fields.destino,
  description: req.fields.description,
  creator: res.locals.user._id
};

var sabiasque = new Sabiasque(data);

sabiasque.save(function (err) {
  if (!err) {
    res.redirect("/home/atractivos/sabiasque/"+sabiasque._id)
  }else {
    res.render(err)
  }
})
});

  /*Relativos a Lugares*/


/*Publicado*/
router.get("/publicado", function (req, res) {
  res.render("app/publicado", { pageName: "Publicado" })
});

router.get("/borradores", function (req, res) {
  res.render("app/borradores", { pageName: "Borradores" })
});


module.exports = router;
