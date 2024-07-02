
def sort_ingredients_list(ingredients):
    """
    Sort each ingredient to an entry in a list.
    :return: list
    """
    print("\n", ingredients, "\n")

    ingredients = ingredients.lower()
    ingredients = ingredients \
        .replace("(", ",").replace(")", ",") \
        .replace(",,", ",").replace(", ,", ",") \
        .replace("[", "").replace("]", "") \
        .replace("+", "").replace("-", "").replace("/", ",") \
        .replace("may contain", ",") \
        .replace(".", "").replace("•", ",").replace("●", ",").replace("·", ",").replace(":", "").split(",")

    for i in range(0, len(ingredients)):
        ingredients[i] = ingredients[i].strip()

    print("\n", ingredients, "\n")

    return ingredients


def check_ingredients(ingredients, i_type):
    """
    Check if ingredients list contains chemicals in i_type list and returns a list of the matching chemicals.
    :param ingredients: list
    :param i_type: list
    :return: list
    """
    res = []
    exact = []
    original = []

    for t in i_type:
        if t in ingredients:
            exact.append(t)
        else:
            for i in ingredients:
                if t in i:
                    res.append(t)
                    original.append(i)
    return [exact, original, res]


def find_chemicals(ingredients):
    """
    Finds out if a product contains harmful chemicals.
    """
    pfas = ["ptfe", "polytef", "c9-15", "c8-18", "fluoroalcohol phosphate", "decafluoropentane",
            "dimethiconol fluoroalcohol dilinoleic acid", "trifluoropropyl dimethiconol", "octafluoropentyl methacrylate"
                                                                                          "perfluoro", "polyfluoro"]
    hormone = ["benzophenone-1", "benzophenone-3", "bha", "bht", "butylparaben", "cyclomethicone", "cyclotetrasiloxane",
               "dimethylcyclosiloxane", "ethylhexyl methoxycinnamate", "propylparaben", "resorcinol", "triclosan",
               "triphenyl phosphate"]
    plastics = ["acrylate", "acrylate copolymer", "styrene copolymer", "polyethylene", "polymethyl methacrylate",
                "polyethylene terephthalate", "nylon"]
    cmr = ["cyclotetrasiloxane", "phmb", "polyaminopropyl biguanide", "p-aminophenol"]

    ingredients = sort_ingredients_list(ingredients)

    pfas_res = check_ingredients(ingredients, pfas)
    hormone_res = check_ingredients(ingredients, hormone)
    plastic_res = check_ingredients(ingredients, plastics)
    cmr_res = check_ingredients(ingredients, cmr)

    exact_match_nr = len(pfas_res[0]) + len(hormone_res[0]) + len(plastic_res[0]) + len(cmr_res[0])

    partly_match_nr = len(pfas_res[2]) + len(hormone_res[2]) + len(plastic_res[2]) + len(cmr_res[2])
    pm_pfas = {"original": ", ".join([p for p in pfas_res[1]]), "matching": ", ".join([p for p in pfas_res[2]])}
    pm_hormone = {"original": ", ".join([h for h in hormone_res[1]]), "matching": ", ".join([h for h in hormone_res[2]])}
    pm_plastic = {"original": ", ".join([p for p in plastic_res[1]]), "matching": ", ".join([p for p in plastic_res[2]])}
    pm_cmr = {"original": ", ".join([c for c in cmr_res[1]]), "matching": ", ".join([c for c in cmr_res[2]])}

    return {"exact_match":
                {"number": exact_match_nr,
                 "pfas": pfas_res[0],
                 "hormone": hormone_res[0],
                 "plastic": plastic_res[0],
                 "cmr": cmr_res[0]},
            "partly_match":
                {"number": partly_match_nr,
                 "pfas": pm_pfas,
                 "hormone": pm_hormone,
                 "plastic": pm_plastic,
                 "cmr": pm_cmr}}

    """
        print("\nExakt match:", len(pfas_res[0]) + len(hormone_res[0]) + len(plastic_res[0]) + len(cmr_res[0]), "stycken")
        print("PFAS änmen: ", ", ".join([p for p in pfas_res[0]]))
        print("Hormonstörande ämnen: ", ", ".join([h for h in hormone_res[0]]))
        print("Plaster: ", ", ".join([p for p in plastic_res[0]]))
        print("Ämnen som kan orsaka cancer, genmutationer eller störa förmågan att få barn (CMR-ämnen): ",
              ", ".join([c for c in cmr_res[0]]), "\n")
    
        print("Delvis match:", len(pfas_res[2]) + len(hormone_res[2]) + len(plastic_res[2]) + len(cmr_res[2]), "stycken")
        print("PFAS änmen:\n"
              "Original: ", ", ".join([p for p in pfas_res[1]]),
              "\nMatchande: ", ", ".join([p for p in pfas_res[2]]))
        print("Hormonstörande ämnen:\n"
              "Original: ", ", ".join([h for h in hormone_res[1]]),
              "\nMatchande: ", ", ".join([h for h in hormone_res[2]]))
        print("Plaster:\n"
              "Original: ", ", ".join([p for p in plastic_res[1]]),
              "\nMatchande: ", ", ".join([p for p in plastic_res[2]]))
        print("Ämnen som kan orsaka cancer, genmutationer eller störa förmågan att få barn (CMR-ämnen):\n"
              "Original: ", ", ".join([c for c in cmr_res[1]]),
              "\nMatchande: ", ", ".join([c for c in cmr_res[2]]))
    """
